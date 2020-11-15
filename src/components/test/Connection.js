import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useClient } from "../../mqttConnection";

export default () => {
  const [message, setMessage] = useState({});
  const { publish, subscribe } = useClient();
  useEffect(() => {}, []);
  return (
    <>
      <Button
        onClick={() => {
          subscribe("vgig/test/audience/test", (topic, message) => {
            console.log(topic, JSON.parse(message));
            setMessage(JSON.parse(message));
          });
        }}
        variant="outlined"
      >
        subscribe to topic
      </Button>
      <br />
      <Button
        onClick={() => {
          console.log(JSON.stringify({ value: "test" }));
          publish(
            "vgig/test/audience/test",
            JSON.stringify({ time: new Date(), value: "test" })
          );
        }}
        variant="outlined"
      >
        send test message on topic
      </Button>
      <br />
      <div>
        {message.time}, {message.value}
      </div>
    </>
  );
};
