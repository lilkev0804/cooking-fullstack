import React from "react";
import {
  Link
} from "react-router-dom";
export default function Navbar(props) {

console.log(window.scrollTop)


  return (
    <div className={`Navbar ${window.scroll() > 200 ? 'fixed-navbar' : ''}`} style={{display : `${props.visible}`}}>
      <div className="navbar-element-menu">
        <button>X</button>
      </div>
      <div className="navbar-element-search">
      <Link to="/">Recipe</Link>
       <div className='searchBar'>
        <img className="icon-navbar" src="images/svg/search.svg"></img>
        <input type="text"></input></div>
      </div>
      <div className="navbar-element-account">
        <Link to="/connexion"> <button>Connexion</button> </Link>
      </div>
    </div>
  );
}
