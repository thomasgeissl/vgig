import { createConnection } from "./libmqtt"

export const useClient = createConnection({
    protocol: "ws",
    host: "try:try@broker.shiftr.io",
    port: 80,
})
// export const useClient = createConnection({
//     protocol: "ws",
//     host: "localhost",
//     port: 9001,
// })