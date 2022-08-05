const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case first:
  //   return {
  //     ...state,
  //     ...payload,
  //   };
  default:
    return state;
  }
};

export default player;
