import { createConnection } from "./libmqtt";
import config from "./config/config.json";

export const useClient = createConnection(config.broker);
