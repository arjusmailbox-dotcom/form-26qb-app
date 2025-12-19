# Form 26QB - TDS on Property Transfer

## Overview

A comprehensive web application for collecting Form 26QB data with automatic PDF generation, email submission, and Google Sheets integration.

## Features

- ✅ **Complete Form 26QB** with all required fields
- ✅ **Real-time Validation** using Zod schemas
- ✅ **PDF Generation** with professional formatting
- ✅ **Auto-Download** of generated PDF
- ✅ **Email Integration** via EmailJS
- ✅ **Google Sheets** data storage
- ✅ **Premium Dark Theme** with glassmorphism
- ✅ **Fully Responsive** design
- ✅ **Mobile Optimized** interface

## Installation

1. Navigate to the project directory:
```bash
cd C:\Users\arjus\.gemini\antigravity\scratch\form-26qb-app
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Configuration

### EmailJS Setup

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `{{to_email}}`
   - `{{buyer_name}}`
   - `{{seller_name}}`
   - `{{property_address}}`
   - `{{total_consideration}}`
   - `{{tds_amount}}`
4. Copy your Service ID, Template ID, and Public Key
5. Update `src/services/emailService.js` with your credentials

### Google Sheets Setup

1. Create a new Google Sheet
2. Go to **Extensions > Apps Script**
3. Paste the code from `src/services/googleSheets.js` comments
4. Deploy as Web App
5. Copy the Web App URL
6. Update `src/services/googleSheets.js` with the URL

## Project Structure

```
form-26qb-app/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── InputField.jsx
│   │   └── RadioGroup.jsx
│   ├── forms/            # Form components
│   │   └── Form26QB.jsx
│   ├── services/         # Backend integrations
│   │   ├── emailService.js
│   │   └── googleSheets.js
│   ├── styles/           # CSS files
│   │   └── index.css
│   ├── utils/            # Utility functions
│   │   ├── pdfGenerator.js
│   │   └── validation.js
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Usage

1. Fill out all required fields in the form
2. Click **"Generate & Submit PDF"**
3. PDF will automatically download
4. Data will be sent to configured email (if enabled)
5. Data will be saved to Google Sheets (if enabled)

## Form Sections

### Section I: Buyer/Transferee Details
- PAN, Name, Address, PIN, Mobile, Email
- Multiple buyer indication

### Section II: Seller/Transferor Details
- PAN, Name, Address, PIN, Mobile, Email
- Residential status
- Multiple seller indication

### Section III: Property Details
- Property address and PIN
- Agreement date
- Consideration value (minimum ₹50 lakh)
- Payment type (lump sum/installment)
- Stamp duty details

### Section IV: Tax Deposit Details
- Amount paid/credited
- Payment, deduction, and deposit dates
- TDS rate and amount
- Payment mode
- Acknowledgement number

## Validation Rules

- **PAN**: Must match format AAAAA9999A
- **PIN**: Must be 6 digits
- **Mobile**: Must be 10 digits
- **Email**: Valid email format
- **Consideration**: Minimum ₹50,00,000

## Legal Disclaimer

This is an **unofficial data collection tool**. The generated PDF is for reference and record-keeping purposes only. Users must still file Form 26QB through the official Income Tax Department portal at [incometax.gov.in](https://incometax.gov.in).

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

For internal use only.
