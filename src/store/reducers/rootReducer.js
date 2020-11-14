import { combineReducers } from "redux";

import visualisation from "./visualisation";
import users from "./users";
import mixer from "./mixer";
import chat from "./chat";
import console from "./console";

const appReducer = combineReducers({
  users,
  mixer,
  chat,
  console,
  visualisation,
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
