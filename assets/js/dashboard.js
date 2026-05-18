// Dashboard Page Logic

document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
    setInterval(loadDashboardData, 30000); // Refresh every 30 seconds
});

async function loadDashboardData() {
    try {
        // Load statistics
        const stats = await getPaymentStats();
        updateStats(stats);

        // Load recent payments
        await loadPayments();
    } catch (error) {
        showError('Failed to load dashboard data: ' + error.message);
    }
}

function updateStats(stats) {
    const statsContainer = document.getElementById('statsContainer');

    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-info">
                <h3>Total Revenue</h3>
                <p class="stat-value">${formatCurrency(stats.totalRevenue || 0)}</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-info">
                <h3>Paid Payments</h3>
                <p class="stat-value">${stats.paidCount || 0}</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">⏳</div>
            <div class="stat-info">
                <h3>Pending Payments</h3>
                <p class="stat-value">${stats.pendingCount || 0}</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">🎁</div>
            <div class="stat-info">
                <h3>Discounted</h3>
                <p class="stat-value">${stats.discountedCount || 0}</p>
            </div>
        </div>
    `;
}

async function loadPayments() {
    try {
        const payments = await getAllPayments();
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
                    <button onclick="viewPaymentDetails(${payment.id})" class="btn btn-sm" style="padding: 4px 8px; font-size: 11px;">View</button>
                    <button onclick="editPayment(${payment.id})" class="btn btn-sm" style="padding: 4px 8px; font-size: 11px;">Edit</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        document.getElementById('paymentsTableBody').innerHTML =
            `<tr><td colspan="10" class="loading-row">Error loading payments</td></tr>`;
        showError('Failed to load payments: ' + error.message);
    }
}

async function searchPayments() {
    const keyword = document.getElementById('searchInput').value.trim();
    if (!keyword) {
        loadPayments();
        return;
    }

    try {
        const results = await apiCall(`/payments/search?q=${encodeURIComponent(keyword)}`);
        const tbody = document.getElementById('paymentsTableBody');

        if (results.length === 0) {
            tbody.innerHTML = '<tr><td colspan="10" class="loading-row">No payments found</td></tr>';
            return;
        }

        tbody.innerHTML = results.map(payment => `
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
                    <button onclick="viewPaymentDetails(${payment.id})" class="btn btn-sm">View</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        showError('Search failed: ' + error.message);
    }
}

async function filterByStatus(status) {
    try {
        if (status === 'ALL') {
            await loadPayments();
            return;
        }

        const payments = await getPaymentsByStatus(status);
        const tbody = document.getElementById('paymentsTableBody');

        if (payments.length === 0) {
            tbody.innerHTML = `<tr><td colspan="10" class="loading-row">No ${status.toLowerCase()} payments found</td></tr>`;
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
                    <button onclick="viewPaymentDetails(${payment.id})" class="btn btn-sm">View</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        showError('Filter failed: ' + error.message);
    }
}

