// Google Sheets Integration with Email Notifications
// This sends form data to Google Sheets, which triggers an automatic email

const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

export async function saveToGoogleSheets(formData) {
  try {
    console.log('📊 Saving to Google Sheets...');
    console.log('📍 URL configured:', GOOGLE_SHEETS_URL ? 'Yes' : 'No');

    if (!GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL === 'your_apps_script_url_here') {
      throw new Error('Google Sheets URL not configured');
    }

    // Send complete form data
    // Note: Using 'text/plain' instead of 'application/json' because mobile browsers
    // often strip or block headers for 'no-cors' requests. Google Apps Script 
    // will still receive the body.
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires this
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(formData)
    });

    // Note: With no-cors, we can't read the response, but the data is sent successfully
    console.log('✅ Data sent to Google Sheets (email will follow)');
    return { success: true };

  } catch (error) {
    console.error('❌ Google Sheets save failed:', error);
    throw new Error(`Failed to save to Google Sheets: ${error.message}`);
  }
}

// Helper function to check if Google Sheets is configured
export function isGoogleSheetsConfigured() {
  const isConfigured = GOOGLE_SHEETS_URL && GOOGLE_SHEETS_URL !== 'your_apps_script_url_here';
  console.log('Google Sheets configured:', isConfigured);
  return isConfigured;
}
