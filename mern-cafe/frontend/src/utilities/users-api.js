// AJAX request to get users making fetch request through the internet
const BASE_URL = '/api/users'; // JSON request is coming from the API

export async function signUp(userData) {
  // Fetch uses an options object as a second arg to make requests other than basic GET requests, include data and set headers.
  // Request to BASE_URL
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData)
  });
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error('Invalid Sign Up');
  }
}