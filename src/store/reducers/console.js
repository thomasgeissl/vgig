const types = {
    ADDTOHISTORY: "ADDTOHISTORY"
};
  
const defaultState = {
    history: [
    ],
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case types.ADDTOHISTORY: {
            let history = [...state.history]
            history.unshift({
                ...action.payload,
                time: new Date()
            })
            history = history.slice(0, 1000)
            return {
                ...state,
                history
            }
        }
    }
    return state
}

const addToHistory = (user, text) => {
    return {
        type: types.ADDTOHISTORY,
        payload: {
            user,
            text
        }
    }
}
export {addToHistory}