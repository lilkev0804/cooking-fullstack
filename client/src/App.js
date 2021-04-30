import React,{useState, useEffect} from "react";
import { BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import Home from './screens/general/Home'
import Connect from './screens/general/Connect'
import MyRecipes from './screens/account/MyRecipes'
import Navbar from './screens/general/Navbar';
import AddRecipe from "./screens/account/AddRecipe";
import MyAccount from "./screens/account/MyAccount";
import UpdateRecipe from "./screens/account/UpdateRecipe";
import Recette from "./screens/general/Recette";
import RecettePlat from "./screens/general/RecettePlat";
import RecetteDessert from "./screens/general/RecetteDessert";
import RecetteEntre from "./screens/general/RecetteEntre";
import Aperitif from "./screens/general/Aperitif";
require('dotenv').config()


function App() {
  const [typeLog , setTypeLog] = useState(true)

useEffect(() => {
  if(localStorage.getItem("token")){
    setTypeLog(false)
  }else{
    setTypeLog(true)
  }
}, [])

  return (
    <Router>
        <Navbar type={typeLog}></Navbar>
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
          <Route path="/compte/modifier-recettes/:id">
            <UpdateRecipe></UpdateRecipe>
          </Route>
          <Route path="/recette/:id">
            <Recette></Recette>
          </Route>
          <Route path="/recettes/plat">
            <RecettePlat></RecettePlat>
          </Route>
          <Route path="/recettes/dessert">
           <RecetteDessert/>
          </Route>
          <Route path="/recettes/entre">
           <RecetteEntre/>
          </Route>
          <Route path="/recettes/aperitif">
           <Aperitif></Aperitif>
          </Route>
          <Route path="/compte">
            <MyAccount />
          </Route>
        </Switch>
    
    </Router>
    
  );
}

export default App;
