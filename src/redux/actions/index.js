export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const QUESTIONS_REQUEST = 'QUESTIONS_REQUEST';
export const SCORE_ACTION = 'SCORE_ACTION';
export const NEW_GAME = 'NEW_GAME';

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

export function scoreAction(score) {
  return {
    type: SCORE_ACTION,
    score,
  };
}

export function newGame() {
  return {
    type: NEW_GAME,
  };
}
