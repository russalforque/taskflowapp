export async function sendToGoogleSheets(data) {
  let WEBAPP_URL = process.env.VUE_APP_GOOGLE_SCRIPT_URL;
  WEBAPP_URL = WEBAPP_URL?.replace(/["']/g, '');

  // Use the incoming data instead of creating a test event
  const eventData = Array.isArray(data) ? data[0] : data;

  // Create URL-encoded form data
  const formData = new URLSearchParams();
  formData.append('data', JSON.stringify(eventData));

  console.log('Sending data:', eventData);

  try {
    await fetch(WEBAPP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });

    console.log('✅ Request sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Error sending data:', error);
    throw error;
  }
} 