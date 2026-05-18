// Create Payment Form Logic

let currentEditId = null;
let memberOptions = [];
let trainerOptions = [];

document.addEventListener('DOMContentLoaded', function() {
    loadFormData();
    document.getElementById('paymentForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('paymentDate').valueAsDate = new Date();
});

async function loadFormData() {
    try {
        // Load members and trainers
        const [members, trainers] = await Promise.all([
            getAllMembers(),
            getAllTrainers()
        ]);

        memberOptions = members;
        trainerOptions = trainers;

        populateMemberSelect(members);
        populateTrainerSelect(trainers);
    } catch (error) {
        showError('Failed to load form data: ' + error.message);
    }
}

function populateMemberSelect(members) {
    const select = document.getElementById('memberId');
    select.innerHTML = '<option value="">-- Select Member --</option>' +
        members.map(m => `<option value="${m.id}" data-type="${m.memberType}">${m.name} (${m.memberType})</option>`).join('');
}

function populateTrainerSelect(trainers) {
    const select = document.getElementById('trainerId');
    select.innerHTML = '<option value="">-- Select Trainer --</option>' +
        trainers.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
}

function updatePayeeOptions() {
    const payeeType = document.getElementById('payeeType').value;
    document.getElementById('memberGroup').style.display = payeeType === 'MEMBER' ? 'block' : 'none';
    document.getElementById('trainerGroup').style.display = payeeType === 'TRAINER' ? 'block' : 'none';
}

function updateMemberDiscount() {
    const memberId = document.getElementById('memberId').value;
    if (!memberId) return;

    const member = memberOptions.find(m => m.id == memberId);
    if (member) {
        // Set default discount based on member type
        const discount = member.memberType === 'PREMIUM' ? 10 : 0;
        document.getElementById('discountPercent').value = discount;
        calculateFinalAmount();
    }
}

function calculateFinalAmount() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const discountPercent = parseInt(document.getElementById('discountPercent').value) || 0;

    const discountAmount = amount * discountPercent / 100;
    const finalAmount = amount - discountAmount;

    document.getElementById('discountAmount').value = discountAmount.toFixed(2);
    document.getElementById('finalAmount').value = finalAmount.toFixed(2);
}

async function handleFormSubmit(e) {
    e.preventDefault();

    // Validate form
    const payeeType = document.getElementById('payeeType').value;
    if (!payeeType) {
        showError('Please select a payee type');
        return;
    }

    let memberId = null;
    let trainerId = null;

    if (payeeType === 'MEMBER') {
        memberId = document.getElementById('memberId').value;
        if (!memberId) {
            showError('Please select a member');
            return;
        }
    } else if (payeeType === 'TRAINER') {
        trainerId = document.getElementById('trainerId').value;
        if (!trainerId) {
            showError('Please select a trainer');
            return;
        }
    }

    const paymentData = {
        memberId: memberId ? parseInt(memberId) : null,
        trainerId: trainerId ? parseInt(trainerId) : null,
        payeeType: payeeType,
        amount: parseFloat(document.getElementById('amount').value),
        paymentMethod: document.getElementById('paymentMethod').value,
        discountPercent: parseInt(document.getElementById('discountPercent').value),
        status: document.getElementById('status').value,
        paymentDate: document.getElementById('paymentDate').value,
        notes: document.getElementById('notes').value
    };

    try {
        const response = await createPayment(paymentData);

        // Show success message
        document.getElementById('paymentForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('successText').textContent =
            `Payment created successfully!\nInvoice ID: ${response.invoiceId}\nFinal Amount: ${formatCurrency(response.finalAmount)}`;

        showSuccess('Payment created successfully!');
    } catch (error) {
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('errorText').textContent = error.message;
        showError('Failed to create payment: ' + error.message);
    }
}
