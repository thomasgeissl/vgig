import { NAME } from "../constants";
import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useClient } from "../mqttConnection";
import { setUsers } from "../store/reducers/users";

import Context from "../Context";

export default () => {
  const { id } = useParams();
  const [context] = useContext(Context);
  const { publish, subscribe } = useClient();
  const dispatch = useDispatch();
  useEffect(() => {
    subscribe(`${NAME}/${id}/audience/setUsers`, (topic, message) => {
      console.log(message);
      dispatch(setUsers(message));
    });
    const intervalId = setInterval(() => {
      publish(`${NAME}/${id}/audience/getUsers`, { from: context.userId });
    }, 30 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return <h1>admin</h1>;
};
