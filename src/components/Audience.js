import React, { useEffect, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
// import * as THREE from 'three'
// import { OrbitControls } from 'drei'
// import { Canvas } from 'react-three-fiber'
// import { useSprings, a } from 'react-spring/three'
import styled from "styled-components";
import { useClient } from "../mqttConnection";
import { NAME } from "../constants";
import { publish } from "../mqtt";
import Context from "../Context";

import { addUser, setUsers, heartBeat } from "../store/reducers/users";
import store from "../store";
import actions from "../config/actions";

import Section from "./Section";

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
  background-color: ${({ action }) => {
    let color = "rgb(64,64,64)";
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
  const [context, setContext] = useContext(Context);

  const users = useSelector((state) => state.users.users);
  const getUsers = useCallback(() => {
    return users;
  });
  useEffect(
    () => {
      if (id) {
        subscribe(`${NAME}/${id}/getUsers`, (topic, message) => {
          if (message.from && message.from !== context.userId) {
            publish(`${NAME}/${id}/setUsers`, store.getState().users.users);
          }
        });
        subscribe(`${NAME}/${id}/setUsers`, (topic, message) => {
          dispatch(setUsers(message));
        });
        subscribe(`${NAME}/${id}/enterLobby`, (topic, message) => {
          dispatch(addUser(message.userId, "anonymous "));
        });

        subscribe(`${NAME}/${id}/alive`, (topic, message) => {
          dispatch(heartBeat(message.userId));
        });

        publish(`${NAME}/${id}/getUsers`, { from: context.userId });
        setInterval(() => {
          publish(`${NAME}/${id}/alive`, { userId: context.userId });
        }, 30 * 1000);
      }
    },
    [id],
    () => {
      unsubscribe(`${NAME}/${id}/getUsers`);
    }
  );
  return (
    <Container>
      {/* <Section title={"audience"} color={"rgb(46, 94, 160)"}> */}
      <Users>
        {users.map((user, index) => {
          const position = [(index / users.length) * 50, 0, 0];
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
