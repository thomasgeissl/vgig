import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Audience from "./components/Audience"
import Conductor from "./components/Conductor"

function App() {
  return (
    <div className="App">
          <Router>
          <Switch>
          <Route path="/conductor">
            <Conductor />
          </Route>
          <Route path="/">
            <Audience />
          </Route>

        </Switch>
          </Router>
    </div>
 )
}

export default App;
