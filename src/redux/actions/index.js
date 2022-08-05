export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export function loginAction(name, email) {
  return {
    type: LOGIN_REQUEST,
    name,
    email,
  };
}
