const types = {
  SETVISUALIZER: "SETVISUALIZER",
};

const defaultState = {
  mode: 0,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SETVISUALIZER: {
      return {
        ...state,
        mode: action.payload.value,
      };
    }
    default:
      return state;
  }
};
