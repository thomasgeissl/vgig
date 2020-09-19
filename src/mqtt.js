import mqtt from "mqtt";
// const client = mqtt.connect("ws://localhost:9001");
const client = mqtt.connect("wss://try:try@broker.shiftr.io");
export default client;