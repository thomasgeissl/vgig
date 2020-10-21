import { combineReducers } from "redux";

import users from "./users";
import chat from "./chat";
import console from "./console";

const appReducer = combineReducers({
  users,
  chat,
  console
});

export default (state, action) => {
  if (action.type === "RESET") {
    return appReducer(undefined, action);
  } else if (action.type === "SETSTATE") {
    return appReducer(action.payload, {
      type: "IGNORE",
    });
  } else {
    return appReducer(state, action);
  }
};
