// Payments Page Logic

let currentEditPaymentId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadAllPayments();
});

async function loadAllPayments() {
    try {
        const payments = await getAllPayments();
        populatePaymentsTable(payments);
    } catch (error) {
        showError('Failed to load payments: ' + error.message);
        document.getElementById('paymentsTableBody').innerHTML =
            `<tr><td colspan="10" class="loading-row">Error loading payments</td></tr>`;
    }
}

function populatePaymentsTable(payments) {
    const tbody = document.getElementById('paymentsTableBody');

    if (payments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="loading-row">No payments found</td></tr>';
        return;
    }

    tbody.innerHTML = payments.map(payment => `
        <tr class="${payment.status === 'PAID' ? 'paid' : 'pending'}">
            <td><strong>${payment.invoiceId}</strong></td>
            <td>${payment.payeeName}</td>
            <td><span class="badge ${getMemberTypeBadgeClass(payment.payeeType)}">${payment.payeeType}</span></td>
            <td>${formatCurrency(payment.amount)}</td>
            <td>${payment.discountPercent}%</td>
            <td><strong>${formatCurrency(payment.finalAmount)}</strong></td>
            <td>${payment.paymentMethod}</td>
            <td><span class="status-badge ${getStatusBadgeClass(payment.status)}">${payment.status}</span></td>
            <td>${formatDate(payment.paymentDate)}</td>
            <td>
                <button onclick="editPayment(${payment.id})" class="btn btn-sm" style="padding: 4px 8px; font-size: 11px;">✏️ Edit</button>
                <button onclick="deletePaymentConfirm(${payment.id}, '${payment.invoiceId}')" class="btn btn-sm" style="padding: 4px 8px; font-size: 11px; background-color: #93000a; color: #ffb4ab;">🗑️ Delete</button>
            </td>
        </tr>
    `).join('');
}

async function searchPayments() {
    const keyword = document.getElementById('searchInput').value.trim();
    if (!keyword) {
        loadAllPayments();
        return;
    }

    try {
        const results = await apiCall(`/payments/search?q=${encodeURIComponent(keyword)}`);
        populatePaymentsTable(results);
    } catch (error) {
        showError('Search failed: ' + error.message);
    }
}

async function filterByStatus(status) {
    try {
        const payments = await getPaymentsByStatus(status);
        populatePaymentsTable(payments);
    } catch (error) {
        showError('Filter failed: ' + error.message);
    }
}

async function editPayment(id) {
    try {
        const payment = await getPaymentById(id);
        currentEditPaymentId = id;

        // Open modal and populate form
        document.getElementById('editAmount').value = payment.amount;
        document.getElementById('editDiscount').value = payment.discountPercent;
        document.getElementById('editStatus').value = payment.status;
        document.getElementById('editNotes').value = payment.notes || '';

        document.getElementById('editModal').style.display = 'flex';
    } catch (error) {
        showError('Failed to load payment: ' + error.message);
    }
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    currentEditPaymentId = null;
}

async function savePaymentEdit() {
    if (!currentEditPaymentId) return;

    try {
        const updateData = {
            amount: parseFloat(document.getElementById('editAmount').value),
            discountPercent: parseInt(document.getElementById('editDiscount').value),
            status: document.getElementById('editStatus').value,
            notes: document.getElementById('editNotes').value,
            paymentMethod: 'CARD', // Keep original method
            paymentDate: new Date().toISOString().split('T')[0],
            payeeType: 'MEMBER' // Placeholder - would need full data
        };

        await updatePayment(currentEditPaymentId, updateData);
        showSuccess('Payment updated successfully!');
        closeEditModal();
        loadAllPayments();
    } catch (error) {
        showError('Failed to update payment: ' + error.message);
    }
}

async function deletePaymentConfirm(id, invoiceId) {
    if (confirm(`Are you sure you want to delete payment ${invoiceId}?\nThis action cannot be undone.`)) {
        await deletePaymentAction(id);
    }
}

async function deletePaymentAction(id) {
    try {
        await deletePayment(id);
        showSuccess('Payment deleted successfully!');
        loadAllPayments();
    } catch (error) {
        showError('Failed to delete payment: ' + error.message);
    }
}
