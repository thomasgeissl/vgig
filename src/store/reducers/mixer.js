const types = {
    SETVOLUMEINTERACTIONS: "SETVOLUMEINTERACTIONS",
  };
  
  const defaultState = {
      volumeInteractions: 0
  };
  
  export default (state = defaultState, action) => {
    switch (action.type) {
        case types.SETVOLUMEINTERACTIONS: {
            return {
                ...state,
                volumeInteractions: action.payload.value
            }
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