const types = {
  SETVOLUMEINTERACTIONS: "SETVOLUMEINTERACTIONS",
  SETVOLUMESTAGE: "SETVOLUMESTAGE",
  SETINTENSITY: "SETINTENSITY",
  SETSPEED: "SETSPEED",
  SETGLITCH: "SETGLITCH",
  SETPIXELATION: "SETPIXELATION",
};

const defaultState = {
  volumeInteractions: 6,
  volumeStage: 6,
  intensity: 2,
  speed: 2,
  glitch: true,
  pixelation: 1,
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
    case types.SETINTENSITY: {
      return {
        ...state,
        intensity: action.payload.value,
      };
    }
    case types.SETSPEED: {
      return {
        ...state,
        speed: action.payload.value,
      };
    }
    case types.SETGLITCH: {
      return {
        ...state,
        glitch: action.payload.value,
      };
    }
    case types.SETPIXELATION: {
      return {
        ...state,
        pixelation: action.payload.value,
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
export const setIntensity = (value) => {
  return {
    type: types.SETINTENSITY,
    payload: {
      value,
    },
  };
};

export const setGlitch = (value) => {
  return {
    type: types.SETGLITCH,
    payload: {
      value,
    },
  };
};
