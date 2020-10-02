import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import Button from '@material-ui/core/Button';
import {Sampler} from "tone"

import Context from "../Context"
import ClappingSample from "../assets/violin_c3.mp3"
import TalkingSample from "../assets/violin_c3.mp3"
import EnterSample from "../assets/enter.mp3"
import {NAME} from  "../constants"
import { useClient } from "../mqttConnection"


const clappingSamples = {
    C3: ClappingSample
}
const talkingSamples = {
    C3: TalkingSample
}
const enterSamples = {
    C3: EnterSample
}

const Container = styled.div`
position: absolute;
top: 0;
right: 0;
width: 33.33vw;
height: 100vh;
background-color: rgba(144,238,144,0.7);
`

export default () => {
    const [context] = useContext(Context)
    const { subscribe, publish, getClient } = useClient()
    const [clapping, setClapping] = useState(null)
    const [talking, setTalking] = useState(null)
    const [enter, setEnter] = useState(null)
    useEffect(()=>{
        const clapping = new Sampler(clappingSamples);
        clapping.toDestination()
        clapping.volume.value = .2
        setClapping(clapping)

        const talking = new Sampler(talkingSamples);
        talking.toDestination()
        talking.volume.value = .2
        setTalking(talking)

        const enter = new Sampler(enterSamples);
        enter.toDestination()
        enter.volume.value = .2
        setEnter(enter)

        const client = getClient();
        client.on("connect", () => {
            console.log("client connected")
        })
    }, [])
    useEffect(() => {
        subscribe(`${NAME}/${context.hallId}/clapping`, (topic, message) => {
            clapping.triggerAttackRelease(60, 20)
        })
        subscribe(`${NAME}/${context.hallId}/talking`, (topic, message) => {
            talking.triggerAttackRelease(60, 20)
        })
        subscribe(`${NAME}/${context.hallId}/enter`, (topic, message) => {
            enter.triggerAttackRelease(72, 20)
            console.log("user entered", message)
        })
        subscribe(`${NAME}/${context.hallId}/leave`, (topic, message) => {
            console.log("user left", message)
        })
        console.log("done subscribing")
    }, [context.hallId])
    
    return (
        <Container>
            <Button variant="contained" color="primary" onClick={() => {
                publish(`${NAME}/${context.hallId}/clapping`, {userId: context.userId})
            }}>
                clapping
            </Button>
            <Button variant="contained" color="primary" onClick={() => {
                publish(`${NAME}/${context.hallId}/talking`, {userId: context.userId})
            }}>
                talking
            </Button>
        </Container>
    )
}