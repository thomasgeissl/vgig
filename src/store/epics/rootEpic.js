import { combineEpics } from "redux-observable";
import timeoutAction from "./timeoutAction";

export default combineEpics(timeoutAction);
