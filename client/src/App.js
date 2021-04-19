import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './screens/general/Home'
import Connect from './screens/general/Connect'
import Account from './screens/general/Account'
import Navbar from './screens/general/Navbar';



function App() {
  return (
    <Router>
      
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/connexion">
            <Connect />
          </Route>
          <Route path="/monespace">
            <Account />
          </Route>
        </Switch>
    
    </Router>
    
  );
}

export default App;
