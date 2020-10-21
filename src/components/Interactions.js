import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from "react-redux"
import styled from "styled-components"
import Button from '@material-ui/core/Button';
import {Sampler, Channel } from "tone"

import Context from "../Context"
import ClappingSample from "../assets/clapping.mp3"
import TalkC2Sample from "../assets/talk_C2.mp3"
import TalkC3Sample from "../assets/talk_C3.mp3"
import TalkC4Sample from "../assets/talk_C4.mp3"
import ShoutSample from "../assets/shout.mp3"
import SingAlongSample from "../assets/singAlong.mp3"
import EnterSample from "../assets/enter.mp3"
import SneezeSample from "../assets/sneeze.mp3"
import CoughSample from "../assets/cough.mp3"
import PhotographSample from "../assets/photograph.mp3"
import PhoneSample from "../assets/phone.mp3"
import WalkSample from "../assets/walk.mp3"
import DanceSample from "../assets/dance.mp3"
import {NAME} from  "../constants"
import { useClient } from "../mqttConnection"

import Console from "./Console"
import { addToHistory } from "../store/reducers/console"


const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 33.33vw;
    height: 100vh;
    background-color: rgb(2,24,43); /* Green */
    display: flex;
    flex-direction: column;
`

const StyledButton = styled.button`
    background-color: rgba(68,143,163,1);
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
`

const actions = ['applaude', 'talk', 'photograph', 'walk', 'sneeze', 'cough', 'dance', 'shout', 'singAlong', 'phone']

export default () => {
    const [context] = useContext(Context)
    const { subscribe, publish, getClient } = useClient()
    const [enter, setEnter] = useState(null)
    const [leave, setLeave] = useState(null)
    const [clap, setClap] = useState(null)
    const [talk, setTalk] = useState(null)
    const [shout, setShout] = useState(null)
    const [singAlong, setSingAlong] = useState(null)
    const [photograph, setPhotograph] = useState(null)
    const [phone, setPhone] = useState(null)
    const [sneeze, setSneeze] = useState(null)
    const [cough, setCough] = useState(null)
    const [walk, setWalk] = useState(null)
    const [dance, setDance] = useState(null)
    const [channel, setChannel] = useState(null)
    
    const dispatch = useDispatch()

    useEffect(()=>{
        const channel = new Channel(-32)
        channel.toDestination();
        setChannel(channel)

        const clapping = new Sampler({C3: ClappingSample});
        clapping.connect(channel)
        setClap(clapping)

        const singAlong = new Sampler({C3: SingAlongSample});
        singAlong.connect(channel)
        setSingAlong(singAlong)

        const talking = new Sampler({
            C2: TalkC2Sample,
            C3: TalkC3Sample,
            C4: TalkC4Sample,
        });

        talking.connect(channel)
        setTalk(talking)

        const shout = new Sampler({C3: ShoutSample});
        shout.connect(channel)
        setShout(shout)

        const enter = new Sampler({C3: EnterSample});
        enter.connect(channel)
        setEnter(enter)

        const leave = new Sampler({C3: EnterSample});
        leave.connect(channel)
        setLeave(leave)

        const photograph = new Sampler({C3: PhotographSample});
        photograph.connect(channel)
        setPhotograph(photograph)

        const phone = new Sampler({C3: PhoneSample});
        phone.connect(channel)
        setPhone(phone)
        
        const walk = new Sampler({C3: WalkSample});
        walk.connect(channel)
        setWalk(walk)

        const dance = new Sampler({C3: DanceSample});
        dance.connect(channel)
        setDance(dance)

        const sneeze = new Sampler({C3: SneezeSample});
        sneeze.connect(channel)
        setSneeze(sneeze)

        const cough = new Sampler({C3: CoughSample});
        cough.connect(channel)
        setCough(cough)

        
        const client = getClient();
        client.on("connect", () => {
            console.log("client connected")
        })
    }, [])
    useEffect(() => {
        subscribe(`${NAME}/${context.hallId}/applaude`, (topic, message) => {
            clap.triggerAttackRelease(40 + Math.round(Math.random()*60), 20)
            dispatch(addToHistory(message.userId, "applauded"))
        })
        subscribe(`${NAME}/${context.hallId}/talk`, (topic, message) => {
            talk.triggerAttackRelease(20 + Math.round(Math.random()*60), 20)
            dispatch(addToHistory(message.userId, "talked"))
        })
        subscribe(`${NAME}/${context.hallId}/shout`, (topic, message) => {
            shout.triggerAttackRelease(40 + Math.round(Math.random()*60), 20)
            dispatch(addToHistory(message.userId, "shouted"))
        })
        subscribe(`${NAME}/${context.hallId}/singAlong`, (topic, message) => {
            singAlong.triggerAttackRelease(40 + Math.round(Math.random()*60), 20)
            dispatch(addToHistory(message.userId, "sang along"))
        })
        subscribe(`${NAME}/${context.hallId}/enter`, (topic, message) => {
            enter.triggerAttackRelease(72, 20)
            dispatch(addToHistory(message.userId, "entered"))
        })
        subscribe(`${NAME}/${context.hallId}/leave`, (topic, message) => {
            console.log("user left", message)
            dispatch(addToHistory(message.userId, "left"))
        })
        subscribe(`${NAME}/${context.hallId}/photograph`, (topic, message) => {
            photograph.triggerAttackRelease(40 + Math.round(Math.random()*60), 20)
            dispatch(addToHistory(message.userId, "took a photo"))
        })
        subscribe(`${NAME}/${context.hallId}/phone`, (topic, message) => {
            phone.triggerAttackRelease(40 + Math.round(Math.random()*60), 20)
            dispatch(addToHistory(message.userId, "took a phone call"))
        })
        subscribe(`${NAME}/${context.hallId}/walk`, (topic, message) => {
            walk.triggerAttackRelease(40 + Math.round(Math.random()*60), 20)
            dispatch(addToHistory(message.userId, "walked"))
        })
        subscribe(`${NAME}/${context.hallId}/dance`, (topic, message) => {
            dance.triggerAttackRelease(40 + Math.round(Math.random()*60), 20)
            dispatch(addToHistory(message.userId, "danced"))
        })
        subscribe(`${NAME}/${context.hallId}/sneeze`, (topic, message) => {
            sneeze.triggerAttackRelease(40 + Math.round(Math.random()*60), 20)
            dispatch(addToHistory(message.userId, "sneezed"))
        })
        subscribe(`${NAME}/${context.hallId}/cough`, (topic, message) => {
            cough.triggerAttackRelease(50 + Math.round(Math.random()*60), 20)
            dispatch(addToHistory(message.userId, "coughed"))
        })
    }, [context.hallId, clap, talk, singAlong, walk, phone, photograph, dance, cough, sneeze, enter, leave])
    
    return (
        <Container>
            <div>
            {actions.map(action => {
                return (
                    <StyledButton key={action} variant="outlined" color="primary" onClick={() => {
                        publish(`${NAME}/${context.hallId}/${action}`, {userId: context.userId})
                    }}>
                        {action}
                    </StyledButton>
                )
            })}
            </div>
            <Console></Console>
        </Container>
    )
}