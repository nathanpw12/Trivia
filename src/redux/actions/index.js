export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const QUESTIONS_REQUEST = 'QUESTIONS_REQUEST';

export function loginAction(name, email) {
  return {
    type: LOGIN_REQUEST,
    name,
    email,
  };
}

export function questionsActions(results) {
  return {
    type: QUESTIONS_REQUEST,
    results,
  };
}
