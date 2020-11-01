const types = {
  SETVOLUMEINTERACTIONS: "SETVOLUMEINTERACTIONS",
  SETGLITCH: "SETGLITCH",
};

const defaultState = {
  volumeInteractions: 0,
  glitch: true,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SETVOLUMEINTERACTIONS: {
      return {
        ...state,
        volumeInteractions: action.payload.value,
      };
    }
    case types.SETGLITCH: {
      return {
        ...state,
        glitch: action.payload.value,
      };
    }
    default:
      return state;
  }
};

export const setVolumeInteractions = (value) => {
  return {
    type: types.SETVOLUMEINTERACTIONS,
    payload: {
      value,
    },
  };
};
