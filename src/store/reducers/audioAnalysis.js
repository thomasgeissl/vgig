const types = {
  SETENERGY: "SETENERGY",
};

const defaultState = {
  energyHistory: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SETENERGY: {
      const energyHistory = [...state.energyHistory];
      energyHistory.unshift(action.payload.value);
      energyHistory.splice(100, energyHistory.length - 100);
      return {
        ...state,
        energyHistory,
      };
    }
    default:
      return state;
  }
};
