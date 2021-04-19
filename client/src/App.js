import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './screens/general/Home'
import Connect from './screens/general/Connect'
import MyRecipes from './screens/account/MyRecipes'
import Navbar from './screens/general/Navbar';
import AddRecipe from "./screens/account/AddRecipe";
import MyAccount from "./screens/account/MyAccount";
require('dotenv').config()


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
          <Route path="/compte/mes-recettes">
            <MyRecipes />
          </Route>
          <Route path="/compte/ajouter-recettes">
            <AddRecipe />
          </Route>
          <Route path="/compte">
            <MyAccount />
          </Route>
        </Switch>
    
    </Router>
    
  );
}

export default App;
