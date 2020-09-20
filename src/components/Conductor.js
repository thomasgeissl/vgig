import React, {useState} from "react"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import client from "../mqtt"
import {createNoteOnMessage} from "../midi"

export default () => {
    const [channel, setChannel] = useState(1)
    const [note, setNote] = useState(60)
    const [velocity, setVelocity] = useState(100)
    return (
        <>
        <Select
          value={channel}
          onChange={(e)=>{
              setChannel(e.target.value)

          }}
        >
          <MenuItem value={1}>percussion (ch. 1)</MenuItem>
          <MenuItem value={2}>violin (ch. 2)</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={13}>13</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={16}>16</MenuItem>
        </Select>
        <TextField label="note" variant="outlined" type="number" value={note} onChange={(e) => {setNote(e.target.value)}}/>
        <TextField label="velocity" variant="outlined" type="number" value={velocity} onChange={(e) => {setVelocity(e.target.value)}}/>
        <Button variant="contained" color="primary" onClick={() => {
            client.publish("vgig/midi", JSON.stringify(createNoteOnMessage(channel, note, velocity)))
        }}>
        trigger test sample
        </Button>
        </>
    )
}