import { combineEpics } from "redux-observable";
import { filter, switchMap, map, takeUntil } from "rxjs/operators";
import { interval } from "rxjs";

import timeoutAction from "./timeoutAction";

// export default (action$) =>
//   action$.pipe(
//     filter((action) => action.type === "STARTHEARTBEAT"),
//     switchMap((action) =>
//       interval(30000).pipe(
//         map((action) => {
//           return {
//             type: "HEARTBEAT",
//             payload: {
//               value: 1,
//             },
//           };
//         }),
//         takeUntil(action$.ofType("STOPHEARTBEAT"))
//       )
//     )
//   );

export default combineEpics(timeoutAction);
