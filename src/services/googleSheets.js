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
    // Note: We use the simplest possible request to avoid preflight/CORS issues on mobile.
    // 'application/x-www-form-urlencoded' or 'text/plain' are "simple" content types.
    const body = JSON.stringify(formData);

    // Try navigator.sendBeacon as a robust fallback for mobile browsers
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      console.log('📡 Using navigator.sendBeacon for robust mobile submission');
      const blob = new Blob([body], { type: 'text/plain' });
      const sent = navigator.sendBeacon(GOOGLE_SHEETS_URL, blob);
      if (sent) {
        console.log('✅ Data queued via sendBeacon');
        return { success: true, method: 'beacon' };
      }
    }

    // Fallback to fetch with minimal headers
    console.log('📡 Using fetch as fallback...');
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: body
    });

    console.log('✅ Data sent to Google Sheets');
    return { success: true, method: 'fetch' };

  } catch (error) {
    console.error('❌ Google Sheets save failed:', error);
    // Even if it fails, we don't want to block the user if the PDF was generated
    // but we should log it clearly.
    throw new Error(`Google Sheets error: ${error.message}`);
  }
}

// Helper function to check if Google Sheets is configured
export function isGoogleSheetsConfigured() {
  const isConfigured = GOOGLE_SHEETS_URL && GOOGLE_SHEETS_URL !== 'your_apps_script_url_here';
  console.log('Google Sheets configured:', isConfigured);
  return isConfigured;
}
