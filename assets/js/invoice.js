// Invoice View Logic

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('invoiceIdInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') loadInvoice();
    });
});

async function loadInvoice() {
    const invoiceId = document.getElementById('invoiceIdInput').value.trim();
    if (!invoiceId) {
        showError('Please enter an Invoice ID');
        return;
    }

    try {
        const payments = await getAllPayments();
        const payment = payments.find(p => p.invoiceId === invoiceId);

        if (!payment) {
            showError(`Invoice ${invoiceId} not found`);
            return;
        }

        displayInvoice(payment);
    } catch (error) {
        showError('Failed to load invoice: ' + error.message);
    }
}

function displayInvoice(payment) {
    document.getElementById('invoiceNumber').textContent = payment.invoiceId;
    document.getElementById('payeeName').textContent = payment.payeeName;
    document.getElementById('payeeType').textContent = payment.payeeType;
    document.getElementById('itemAmount').textContent = formatCurrency(payment.amount);
    document.getElementById('subtotal').textContent = formatCurrency(payment.amount);
    document.getElementById('discountPercentDisplay').textContent = payment.discountPercent;
    document.getElementById('discountAmount').textContent = formatCurrency(payment.amount * payment.discountPercent / 100);
    document.getElementById('total').textContent = formatCurrency(payment.finalAmount);
    document.getElementById('paymentStatus').textContent = payment.status;
    document.getElementById('paymentMethod').textContent = payment.paymentMethod;
    document.getElementById('paymentDate').textContent = formatDate(payment.paymentDate);
    document.getElementById('notes').textContent = payment.notes || '-';

    document.getElementById('invoiceContainer').style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('printBtn').style.display = 'inline-block';
    document.getElementById('downloadBtn').style.display = 'inline-block';
}

function printInvoice() {
    const printContents = document.getElementById('invoicePreview').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
}

function downloadInvoice() {
    alert('PDF download feature coming soon. Use Print → Save as PDF for now.');
}

function showError(message) {
    console.error(message);
    document.getElementById('errorMessage').style.display = 'block';
    document.getElementById('errorText').textContent = message;
}
