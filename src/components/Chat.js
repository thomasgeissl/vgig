import React, { useState, useEffect, useContext } from "react";
import Context from "../Context"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import TextField from '@material-ui/core/TextField';
import { compareAsc, format } from 'date-fns'
import { useClient } from "../mqttConnection"

import {addMessage} from "../store/reducers/chat"

const Container = styled.div`
    width: 100%;
    flex-grow: 1;
    background-color: #0197F6;
    overflow-y: scroll;
`

const Time = styled.span`
    font-style: italic;
    color: #333;
`
const User = styled.span`
    font-weight: bold;
    color: #333;
`
const List = styled.ul`
    list-style-type: none;
`



export default () => {
    const [message, setMessage] = useState("")
    const history = useSelector(state => state.console.history)
    const [context] = useContext(Context)
    const dispatch = useDispatch()
    const messages = useSelector(state => state.chat.messages)
    const { subscribe, publish, getClient } = useClient()
    console.log(context.userId, context.hallId)
    useEffect(()=> {
        if(context.userId && context.hallId){
            subscribe(`vgig/${context.hallId}/chat`, (message) => {
                console.log(message)
            })
            console.log("subscrie to chate")
        }

    }, [context])
  return (
    <Container>
        <h2>chat</h2>
        <TextField fullWidth 
            value={message} 
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    setMessage("")
                    dispatch(addMessage(context.userId, message))
                }
              }}
        ></TextField>
        <button onClick={(event) => {
            if(message !== ""){
                dispatch(addMessage(context.userId, message))
            }
            setMessage("")
        }}>send</button>
        <ul>
        {messages.map((message, index) => {
            return (
                <li key={index}>{message.sender}: {message.text}</li>
            )
        })}
        </ul>
    </Container>
  );
};