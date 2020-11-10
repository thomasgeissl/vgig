import { createConnection } from "./libmqtt";

// export const useClient = createConnection({
//     protocol: "wss",
//     username: "try",
//     password: "try",
//     host: "broker.shiftr.io",
//     port: 80,
// })
// export const useClient = createConnection({
//     protocol: "ws",
//     host: "localhost",
//     port: 9001,
// })

// export const useClient = createConnection("wss://try:try@broker.shiftr.io");
// export const useClient = createConnection(
//   "ws://audience:audience@localhost:9001"
// );
export const useClient = createConnection(
  "wss://audience:audience@v-gig.com:8081"
);
