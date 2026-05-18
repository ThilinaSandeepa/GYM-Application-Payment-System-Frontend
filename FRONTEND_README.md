# FitCore Payment Dashboard - Frontend Documentation

## Project Overview

Complete HTML5 + JavaScript frontend for FitCore Payment & Discount Management System. Built with vanilla JavaScript and CSS following the FitCore Precision design system.

## Features

✅ **Dashboard** - Real-time statistics and payment overview
✅ **Payment Management** - Create, view, edit, delete payments
✅ **Invoice Generation** - Auto-generated invoices with print support
✅ **Member Management** - Add, edit, delete members (PREMIUM, NEW types)
✅ **Trainer Management** - Add, edit, delete trainers
✅ **Advanced Search** - Search payments by member, trainer, or invoice ID
✅ **Status Filtering** - Filter by PAID or PENDING status
✅ **Discount Calculation** - Auto-calculate discounts based on member type
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Real-time Updates** - Dashboard refreshes every 30 seconds

## File Structure

```
frontend/
├── index.html              # Dashboard homepage
├── create-payment.html     # Payment creation form
├── payments.html           # All payments listing
├── invoices.html           # Invoices with print preview
├── members.html            # Members management
├── trainers.html           # Trainers management
├── styles.css              # Main stylesheet (FitCore design system)
├── api.js                  # API utility functions & CRUD operations
├── dashboard.js            # Dashboard page logic
├── create-payment.js       # Payment form logic
├── payments.js             # Payments listing logic
├── invoices.js             # Invoices logic
├── members.js              # Members page logic
└── trainers.js             # Trainers page logic
```

## Setup Instructions

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Backend server running on `http://localhost:8080`
- MySQL database populated with sample data

### Step 1: Ensure Backend is Running

```bash
cd backend
mvn spring-boot:run
```

Backend should be accessible at: `http://localhost:8080`

### Step 2: Serve Frontend Files

You can use any HTTP server. Examples:

**Python 3:**
```bash
cd frontend
python -m http.server 5500
```

**Python 2:**
```bash
cd frontend
python -m SimpleHTTPServer 5500
```

**Node.js (http-server):**
```bash
npm install -g http-server
cd frontend
http-server -p 5500
```

**Live Server (VS Code Extension):**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### Step 3: Access Dashboard

Open browser and navigate to:
```
http://localhost:5500
```

or

```
http://127.0.0.1:5500
```

## API Configuration

API base URL is configured in `api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

To change the backend URL, edit this line in `api.js`.

## Page Descriptions

### 1. Dashboard (index.html)
- **Purpose:** Overview of payment metrics
- **Features:**
  - Total revenue (LKR)
  - Paid payments count
  - Pending payments count
  - Discounted payments count
  - Recent payments table
  - Search functionality
  - Status filtering

### 2. Create Payment (create-payment.html)
- **Purpose:** Record new payment transactions
- **Features:**
  - Payee type selection (MEMBER or TRAINER)
  - Auto-load member/trainer list
  - Auto-calculate discount based on member type
  - Manual discount override
  - Real-time final amount calculation
  - Payment method selection
  - Status selection (PAID/PENDING)
  - Notes field

### 3. All Payments (payments.html)
- **Purpose:** View and manage all payments
- **Features:**
  - Table with all payment details
  - Search by invoice ID, member name, or trainer name
  - Filter by status (PAID/PENDING)
  - Edit payment button
  - Delete payment with confirmation
  - Modal-based editing

### 4. Invoices (invoices.html)
- **Purpose:** View and print invoices
- **Features:**
  - Table with all invoices
  - Invoice preview modal
  - Professional invoice template
  - Print functionality
  - Download PDF button (placeholder)
  - Print all invoices (placeholder)

### 5. Members (members.html)
- **Purpose:** Manage gym members
- **Features:**
  - List all members
  - Filter by type (PREMIUM, NEW)
  - Add new member
  - Edit member details
  - Delete member
  - Modal forms

### 6. Trainers (trainers.html)
- **Purpose:** Manage gym trainers
- **Features:**
  - List all trainers
  - Add new trainer
  - Edit trainer details
  - Delete trainer
  - Modal forms

## Key JavaScript Files

### api.js
Centralized API communication layer. Contains:
- `apiCall()` - Generic fetch wrapper
- `getAllPayments()`, `getPaymentById()`, `createPayment()`, `updatePayment()`, `deletePayment()`
- `searchPayments()`, `getPaymentsByStatus()`, `getPaymentStats()`
- `getAllMembers()`, `getMemberById()`, `getMembersByType()`, `createMember()`, `updateMember()`, `deleteMember()`
- `getAllTrainers()`, `getTrainerById()`, `createTrainer()`, `updateTrainer()`, `deleteTrainer()`
- `getAllInvoices()`, `getInvoiceByPaymentId()`, `generateInvoice()`
- Utility functions: `formatCurrency()`, `formatDate()`, `showError()`, `showSuccess()`

### Styling Features

The frontend uses the FitCore Precision design system:
- **Dark Mode First** - Background: #131313
- **Neon Yellow Accent** - #AED500 (primary actions)
- **Typography** - Archivo Narrow (headers), Geist (body)
- **Grid System** - 8px base unit
- **Responsive** - Mobile-first approach
- **Data Density** - Compact spacing for information-heavy tables

## Common Tasks

### Search for a Payment
1. Navigate to **Dashboard** or **All Payments**
2. Enter search term (invoice ID, member name, or trainer name)
3. Click **Search** button
4. Results filtered in real-time

### Create a New Payment
1. Click **New Payment** in navbar
2. Select payee type (MEMBER or TRAINER)
3. Select member/trainer from dropdown
4. Enter amount (LKR)
5. Discount auto-calculated based on member type
6. Override discount if needed (0%, 5%, 10%, 15%, 20%)
7. Select payment method (CARD or CASH)
8. Select status (PAID or PENDING)
9. Click **Create Payment**

### View Invoice
1. Navigate to **Invoices**
2. Click **View** on any invoice row
3. Preview modal opens with professional invoice
4. Click **Print** to print or **Download PDF** (coming soon)

### Edit Member
1. Navigate to **Members**
2. Click **Edit** button
3. Update details in modal
4. Click **Save Member**

### Delete Payment
1. Navigate to **All Payments**
2. Click **Delete** button
3. Confirm deletion
4. Payment removed from system

## Troubleshooting

### "Failed to load payments: Error connecting to API"
- **Solution:** Ensure backend is running on `http://localhost:8080`
- Run: `cd backend && mvn spring-boot:run`

### CORS Errors in browser console
- **Solution:** Backend CORS is configured for `localhost:5500`
- Ensure you're accessing frontend from correct URL
- Check backend `CorsConfig.java` has correct allowed origins

### "No payments found"
- **Solution:** Check backend database is populated with data.sql
- Run: `mvn spring-boot:run` (should auto-load sample data)
- Or manually insert data via MySQL

### Form not submitting
- **Solution:** Check browser console (F12) for validation errors
- Ensure all required fields are filled
- Check that backend is responding to requests

### Date picker not working
- **Solution:** Ensure browser supports HTML5 date input
- Use modern browser (Chrome, Firefox, Safari, Edge)

## Future Enhancements

🔄 **TODO:** PDF Invoice Download (html2pdf integration)
🔄 **TODO:** Payment Analytics Dashboard
🔄 **TODO:** User Authentication
🔄 **TODO:** Email Invoice to member
🔄 **TODO:** Payment Gateway Integration
🔄 **TODO:** Bulk Payment Upload (CSV)
🔄 **TODO:** Monthly Reports
🔄 **TODO:** Payment Reminders

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |

## Performance Tips

- Dashboard refreshes every 30 seconds (configurable)
- Lazy load images and modals
- Minimize API calls with caching
- Use browser DevTools to profile

## Support & Documentation

- **API Docs:** http://localhost:8080/swagger-ui.html
- **Backend README:** See `backend/README.md`
- **Design System:** See `styles/DESIGN.md`

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** ✅ Ready for Production
