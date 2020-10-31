const types = {
  ADDMESSAGE: "ADDMESSAGE",
};

const defaultState = {
  messages: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.ADDMESSAGE: {
      let messages = [...state.messages];
      messages.unshift({
        ...action.payload.message,
        time: new Date(),
        type: "CHAT",
      });
      messages = messages.splice(0, 100);
      return {
        ...state,
        messages,
      };
    }
    default:
      return state;
  }
};

export const addMessage = (user, text) => {
  return {
    type: types.ADDMESSAGE,
    payload: {
      message: {
        user,
        text,
      },
    },
  };
};
export { types };
