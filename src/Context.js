import React, {useState} from "react"
import {generateId} from "./utils"
const Context = React.createContext();

const Provider = ({children}) => {
    const [state, setState] = useState({userId: generateId(8)});
    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>

    )
}
export default Context
export {Provider} 