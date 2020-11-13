import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import styled from "styled-components";
import { useClient } from "../mqttConnection";
import { NAME } from "../constants";
import { publish } from "../mqtt";
import Context from "../Context";

import { addUser, setUsers, heartBeat } from "../store/reducers/users";
import store from "../store";
import config from "../config/config.json";
const actions = config.actions;

const Container = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`;

const Users = styled.div`
  text-align: left;
`;
const User = styled.div`
  height: 25px;
  width: 25px;
  background-color: ${({ action, active }) => {
    let color = active ? "rgb(127,127,127)" : "rgb(64,64,64)";
    actions.forEach((item) => {
      if (item.id === action) {
        color = item.color;
      }
    });
    return `${color}`;
  }};
  /* background-color: ${(props) =>
    props.active ? "rgb(255,170,100)" : "rgb(254, 250, 170)"}; */
  border-radius: 50%;
  display: inline-block;
  margin: 5px;
  /* border: ${({ action }) => {
    let color = "black";
    actions.forEach((item) => {
      if (item.id === action) {
        color = item.color;
      }
    });
    return `solid 3px ${color}`;
  }}; */
`;

// const Sphere = ({position, color}) => {
//   return (
//     <mesh visible userData={{ test: "hello" }} position={position} castShadow>
//       <sphereGeometry attach="geometry" args={[1, 16, 16]} />
//       <meshStandardMaterial attach="material" color={color}        transparent        roughness={0.1}        metalness={0.1}      />
//     </mesh>
//     );
// }

export default ({ id }) => {
  const dispatch = useDispatch();
  const { subscribe, unsubscribe } = useClient();
  const [context] = useContext(Context);
  const [subscribed, setSubscribed] = useState(false);
  const users = useSelector((state) => state.users.users);

  useEffect(
    () => {
      if (subscribed) return;
      setSubscribed(true);
      if (id) {
        console.log("subscribing to audience topics");
      }
    },
    [subscribed, setSubscribed, id, subscribe, dispatch, context],
    () => {
      unsubscribe(`${NAME}/${id}/audience/getUsers`);
    }
  );
  return (
    <Container>
      {/* <Section title={"audience"} color={"rgb(46, 94, 160)"}> */}
      <Users>
        {users.map((user, index) => {
          // const position = [(index / users.length) * 50, 0, 0];
          return (
            <Tooltip key={user.id} title={user.name} placement="right-start">
              <User
                key={user.id}
                active={context.userId === user.id}
                action={user.currentAction}
              >
                {/* {user} */}
              </User>
            </Tooltip>
          );
        })}
      </Users>
      {/* </Section> */}
    </Container>
  );
};
