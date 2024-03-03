// Service modules export business/app logic
// such as managing tokens, etc.
// Service modules often depend upon API modules for making AJAX requests to the server.

import * as usersAPI from './users-api'; // everything export from users-api is attached to usersAPI

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData); // pass in userData to signUp method
  // Persist the "token".  localStorage only stores strings
  // first arg is key and store userData in second arg
  localStorage.setItem('token', token);
  // return token;
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  // a JWT's exp is expressed in seconds, not miliseconds
  if (payload.exp * 1000 < Date.now()) {
    // Token has expired - remove it from localstorage
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null
}
