// FitCore Payment API - Utility Functions

const API_BASE_URL = 'http://192.168.1.2:8080/api';

// Helper function for API calls
async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
}

// ============ PAYMENT APIs ============
async function getAllPayments() {
    return apiCall('/payments', 'GET');
}

async function getPaymentById(id) {
    return apiCall(`/payments/${id}`, 'GET');
}

async function createPayment(data) {
    return apiCall('/payments', 'POST', data);
}

async function updatePayment(id, data) {
    return apiCall(`/payments/${id}`, 'PUT', data);
}

async function deletePayment(id) {
    return apiCall(`/payments/${id}`, 'DELETE');
}

async function searchPayments(keyword) {
    return apiCall(`/payments/search?q=${encodeURIComponent(keyword)}`, 'GET');
}

async function getPaymentsByStatus(status) {
    return apiCall(`/payments/status/${status}`, 'GET');
}

async function getPaymentStats() {
    return apiCall('/payments/stats', 'GET');
}

// ============ INVOICE APIs ============
async function getAllInvoices() {
    return apiCall('/invoices', 'GET');
}

async function getInvoiceByPaymentId(paymentId) {
    return apiCall(`/invoices/payment/${paymentId}`, 'GET');
}

async function generateInvoice(paymentId) {
    return apiCall(`/invoices/payment/${paymentId}`, 'POST');
}

// ============ MEMBER APIs ============
async function getAllMembers() {
    return apiCall('/members', 'GET');
}

async function getMemberById(id) {
    return apiCall(`/members/${id}`, 'GET');
}

async function getMembersByType(type) {
    return apiCall(`/members/type/${type}`, 'GET');
}

async function createMember(data) {
    return apiCall('/members', 'POST', data);
}

async function updateMember(id, data) {
    return apiCall(`/members/${id}`, 'PUT', data);
}

async function deleteMember(id) {
    return apiCall(`/members/${id}`, 'DELETE');
}

// ============ TRAINER APIs ============
async function getAllTrainers() {
    return apiCall('/trainers', 'GET');
}

async function getTrainerById(id) {
    return apiCall(`/trainers/${id}`, 'GET');
}

async function createTrainer(data) {
    return apiCall('/trainers', 'POST', data);
}

async function updateTrainer(id, data) {
    return apiCall(`/trainers/${id}`, 'PUT', data);
}

async function deleteTrainer(id) {
    return apiCall(`/trainers/${id}`, 'DELETE');
}

// ============ UTILITY FUNCTIONS ============
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-LK');
}

function getStatusBadgeClass(status) {
    return status === 'PAID' ? 'status-paid' : 'status-pending';
}

function getMemberTypeBadgeClass(type) {
    return type === 'PREMIUM' ? 'badge-premium' : 'badge-new';
}

function showError(message) {
    console.error(message);
    alert(`Error: ${message}`);
}

function showSuccess(message) {
    console.log(message);
}
