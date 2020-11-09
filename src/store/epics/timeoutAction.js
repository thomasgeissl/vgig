import { filter, map, delay } from "rxjs/operators";
import { types, unSetCurrentAction } from "../reducers/users";

export default (action$) =>
  action$.pipe(
    filter((action) => action.type === types.SETCURRENTACTION),
    map((action) => unSetCurrentAction(action.payload.id)),
    delay(100)
  );
