import React, { useEffect, useContext, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Tooltip from "@material-ui/core/Tooltip"
// import * as THREE from 'three'
// import { OrbitControls } from 'drei'
// import { Canvas } from 'react-three-fiber'
// import { useSprings, a } from 'react-spring/three'
import { useClient } from "../mqttConnection"
import { NAME } from  "../constants"
import { publish } from '../mqtt'
import Context from "../Context"

import { addUser, setUsers, heartBeat } from "../store/reducers/users"
import store from "../store"

import styled from "styled-components"

const Container = styled.div`
  background-color: #448FA3;
  height: 33.33vh;
  width: 66.66%;
`

const User = styled.div`
height: 25px;
width: 25px;
background-color: ${props => props.active ? "#0197F6" : "#E2D388"};
border-radius: 50%;
display: inline-block;
margin: 5px;
border: 1px solid black;
`

// const Sphere = ({position, color}) => {
//   return (
//     <mesh visible userData={{ test: "hello" }} position={position} castShadow>
//       <sphereGeometry attach="geometry" args={[1, 16, 16]} />      
//       <meshStandardMaterial attach="material" color={color}        transparent        roughness={0.1}        metalness={0.1}      />    
//     </mesh>  
//     );
// }





export default ({id}) => {
  const dispatch = useDispatch()
  const { subscribe, unsubscribe } = useClient()
  const [context, setContext] = useContext(Context)

  const users = useSelector(state => state.users.users)
  const getUsers = useCallback(() => {
    return users
  })
  useEffect(() => {
    if(id){
      subscribe( `${NAME}/${id}/getUsers`, (topic, message) => {
        if(message.from && message.from !== context.userId) {
          publish(`${NAME}/${id}/setUsers`, store.getState().users.users)
        }
      })
      subscribe( `${NAME}/${id}/setUsers`, (topic, message) => {
        dispatch(setUsers(message))
      })
      subscribe(`${NAME}/${id}/enter`, (topic, message) => {
        dispatch(addUser(message.userId))
      })

      subscribe(`${NAME}/${id}/alive`, (topic, message) => {
        console.log("user is alive", message)
        dispatch(heartBeat(message.userId))
      })


      publish(`${NAME}/${id}/getUsers`, {from: context.userId })
      setInterval(()=> {
        publish(`${NAME}/${id}/alive`, {userId: context.userId})
      }, 30*1000)
    }
  }, [id], ()=> {
      unsubscribe(`${NAME}/${id}/getUsers`)
  });
    return (
    <Container>
      <h2 style={{marginTop: 0}}>audience</h2>
      {

        users.map((user, index) => {
          const position = [index/users.length * 50,0,0]
          return (
          <Tooltip key={user} title={user} placement="right-start">
            <User key={user} active={context.userId === user}>
              {/* {user} */}
            </User>
          </Tooltip>
          )
        }) 
      }
    </Container>
    )
}