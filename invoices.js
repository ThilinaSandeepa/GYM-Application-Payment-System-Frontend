// Invoices Page Logic

document.addEventListener('DOMContentLoaded', function() {
    loadAllInvoices();
});

async function loadAllInvoices() {
    try {
        const invoices = await getAllInvoices();
        populateInvoicesTable(invoices);
    } catch (error) {
        showError('Failed to load invoices: ' + error.message);
        document.getElementById('invoicesTableBody').innerHTML =
            `<tr><td colspan="11" class="loading-row">Error loading invoices</td></tr>`;
    }
}

function populateInvoicesTable(invoices) {
    const tbody = document.getElementById('invoicesTableBody');

    if (invoices.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" class="loading-row">No invoices found</td></tr>';
        return;
    }

    tbody.innerHTML = invoices.map(invoice => `
        <tr>
            <td><strong>${invoice.invoiceNumber}</strong></td>
            <td>${invoice.payeeName}</td>
            <td><span class="badge">${invoice.payeeType}</span></td>
            <td>${formatCurrency(invoice.originalAmount)}</td>
            <td>${invoice.discountPercent}%</td>
            <td>${formatCurrency(invoice.discountAmount)}</td>
            <td><strong>${formatCurrency(invoice.totalPayable)}</strong></td>
            <td>${invoice.paymentMethod}</td>
            <td><span class="status-badge ${getStatusBadgeClass(invoice.paymentStatus)}">${invoice.paymentStatus}</span></td>
            <td>${formatDate(invoice.paymentDate)}</td>
            <td>
                <button onclick="viewInvoice('${invoice.invoiceNumber}', ${JSON.stringify(invoice).replace(/"/g, '&quot;')})" class="btn btn-sm" style="padding: 4px 8px; font-size: 11px;">👁️ View</button>
            </td>
        </tr>
    `).join('');
}

function viewInvoice(invoiceNumber, invoice) {
    document.getElementById('invoicePreview').innerHTML = generateInvoiceHTML(invoice);
    document.getElementById('invoiceModal').style.display = 'flex';
}

function generateInvoiceHTML(invoice) {
    return `
        <div class="invoice-header">
            <h1>INVOICE</h1>
            <p style="margin-top: 10px; font-size: 14px;">Invoice #: ${invoice.invoiceNumber}</p>
        </div>

        <div class="invoice-details">
            <div class="invoice-detail-group">
                <h3>Invoice Details</h3>
                <p><strong>Invoice Date:</strong> ${formatDate(invoice.paymentDate)}</p>
                <p><strong>Payment Status:</strong> ${invoice.paymentStatus}</p>
                <p><strong>Payment Method:</strong> ${invoice.paymentMethod}</p>
            </div>
            <div class="invoice-detail-group">
                <h3>Payee Information</h3>
                <p><strong>Name:</strong> ${invoice.payeeName}</p>
                <p><strong>Type:</strong> ${invoice.payeeType}</p>
            </div>
        </div>

        <div class="invoice-items">
            <table>
                <tr>
                    <th>Description</th>
                    <th style="text-align: right;">Amount</th>
                </tr>
                <tr>
                    <td>Membership Fee</td>
                    <td style="text-align: right;">${formatCurrency(invoice.originalAmount)}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                    <td>Discount (${invoice.discountPercent}%)</td>
                    <td style="text-align: right;">-${formatCurrency(invoice.discountAmount)}</td>
                </tr>
            </table>
        </div>

        <div class="invoice-totals">
            <div class="totals-table">
                <table>
                    <tr>
                        <td style="width: 60%;">Subtotal</td>
                        <td style="text-align: right;">${formatCurrency(invoice.originalAmount)}</td>
                    </tr>
                    <tr>
                        <td>Discount</td>
                        <td style="text-align: right;">-${formatCurrency(invoice.discountAmount)}</td>
                    </tr>
                    <tr class="total">
                        <td>TOTAL PAYABLE</td>
                        <td style="text-align: right;">${formatCurrency(invoice.totalPayable)}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div style="text-align: center; color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc;">
            <p>Thank you for your business!</p>
            <p>FitCore Gym Management System</p>
        </div>
    `;
}

function closeInvoiceModal() {
    document.getElementById('invoiceModal').style.display = 'none';
}

function printInvoice() {
    const printWindow = window.open('', '', 'width=900,height=600');
    const invoiceContent = document.getElementById('invoicePreview').innerHTML;
    printWindow.document.write(`
        <html>
        <head>
            <title>Invoice</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .invoice-preview { background: white; padding: 40px; }
            </style>
        </head>
        <body>
            <div class="invoice-preview">${invoiceContent}</div>
            <script>window.print();</script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

function downloadInvoice() {
    alert('PDF download feature coming soon!');
    // Could implement html2pdf library
}

function printAllInvoices() {
    alert('Print all feature coming soon!');
}
