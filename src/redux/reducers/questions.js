import { QUESTIONS_REQUEST } from '../actions';

const INITIAL_STATE = {
  results: [],
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS_REQUEST:
    return {
      ...state,
      results: action.results,
    };
  default:
    return state;
  }
};

export default questions;
