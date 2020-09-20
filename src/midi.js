const status = {
    noteOn: 144,
    noteOff: 128
}
const createNoteOnMessage = (channel, note, vel) => {
    return {
        channel,
        status: status.noteOn,
        note,
        velocity: vel ? vel : 127
    }
}
export {createNoteOnMessage, status}