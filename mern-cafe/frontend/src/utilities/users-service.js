// Service modules export business/app logic
// such as managing tokens, etc.
// Service modules often depend upon API modules for making AJAX requests to the server.

import * as usersAPI from './users-api'; // everything export from users-api is attached to usersAPI

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData); // pass in userData to signUp method
  // TODO: return user object from token instead
  return token;
}