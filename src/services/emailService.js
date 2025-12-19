// Web3Forms - Free email service that works from browser
// No backend needed, no CORS issues
// Get your access key from: https://web3forms.com

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export async function sendEmail(formData, pdfBlob, recipientEmail) {
    try {
        console.log('📧 Starting email send via Web3Forms...');
        console.log('📄 PDF size:', Math.round(pdfBlob.size / 1024), 'KB');
        console.log('📧 Recipient:', recipientEmail);
        console.log('🔑 Access key configured:', WEB3FORMS_ACCESS_KEY ? 'Yes' : 'No');

        // Prepare form data for Web3Forms
        const form = new FormData();
        form.append('access_key', WEB3FORMS_ACCESS_KEY);
        form.append('subject', `Form 26QB - ${formData.buyerName || formData.buyer1Name}`);
        form.append('from_name', 'Form 26QB Application');
        form.append('email', recipientEmail); // Recipient set in Web3Forms dashboard

        // Form details in email body
        const emailBody = `
New Form 26QB Submission

BUYER INFORMATION:
- Name: ${formData.buyerName || formData.buyer1Name}
- PAN: ${formData.buyerPAN || formData.buyer1PAN}

SELLER INFORMATION:
- Name: ${formData.sellerName}
- PAN: ${formData.sellerPAN}

PROPERTY DETAILS:
- Address: ${formData.propertyFullAddress}
- PIN: ${formData.propertyPIN}

FINANCIAL DETAILS:
- Total Consideration: Rs. ${parseFloat(formData.totalConsideration).toLocaleString('en-IN')}
- TDS Amount: Rs. ${parseFloat(formData.tdsAmount).toLocaleString('en-IN')}
- Submission Date: ${new Date().toLocaleDateString('en-IN')}

PDF file: Form_26QB_${formData.sellerPAN}_${new Date().toISOString().split('T')[0]}.pdf
(Downloaded to user's device)
        `;

        form.append('message', emailBody);

        // Note: Web3Forms free tier doesn't support file attachments
        // The PDF is already downloaded to the user's device
        // This email is just a notification

        console.log('📤 Sending notification email (PDF was already downloaded)...');

        // Send email via Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: form
        });

        const result = await response.json();

        console.log('📬 Web3Forms response:', result);

        if (result.success) {
            console.log('✅ Email sent successfully via Web3Forms!');
            return result;
        } else {
            console.error('❌ Web3Forms error response:', result);
            throw new Error(result.message || 'Email sending failed');
        }

    } catch (error) {
        console.error('❌ Web3Forms email failed:', error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}

// Helper function to check if Web3Forms is configured
export function isEmailConfigured() {
    return WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'your_access_key_here';
}
