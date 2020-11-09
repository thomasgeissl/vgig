import { combineReducers } from "redux";

import audioAnalysis from "./audioAnalysis";
import users from "./users";
import mixer from "./mixer";
import chat from "./chat";
import console from "./console";

const appReducer = combineReducers({
  audioAnalysis,
  users,
  mixer,
  chat,
  console,
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
