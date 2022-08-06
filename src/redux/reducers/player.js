import { LOGIN_REQUEST, SCORE_ACTION } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_REQUEST:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case SCORE_ACTION:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};

export default player;
