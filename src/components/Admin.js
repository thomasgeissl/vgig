import { NAME } from "../constants";
import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useClient } from "../mqttConnection";

import Context from "../Context";

export default () => {
  const { id } = useParams();
  const [context, setContext] = useContext(Context);
  const { publish, subscribe } = useClient();
  useEffect(() => {
    publish(`${NAME}/${id}/audience/getUsers`, { from: context.userId });
  });
  subscribe(`${NAME}/${id}/audience/setUsers`, (topic, message) => {
    console.log(message);
    // dispatch(setUsers(message));
  });
  return <h1>admin</h1>;
};
