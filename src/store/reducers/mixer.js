const types = {
  SETVOLUMEINTERACTIONS: "SETVOLUMEINTERACTIONS",
  SETVOLUMESTAGE: "SETVOLUMESTAGE",
  SETGLITCH: "SETGLITCH",
};

const defaultState = {
  volumeInteractions: -64,
  volumeStage: -32,
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
    case types.SETVOLUMESTAGE: {
      return {
        ...state,
        volumeStage: action.payload.value,
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
export const setVolumeStage = (value) => {
  return {
    type: types.SETVOLUMESTAGE,
    payload: {
      value,
    },
  };
};
