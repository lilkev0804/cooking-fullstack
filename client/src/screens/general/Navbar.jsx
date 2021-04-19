import React from "react";
import {useSelector} from 'react-redux'
import {
  Link
} from "react-router-dom";
import {selectUser} from '../../features/userSlice'
export default function Navbar(props) {

console.log(window.scrollTop)
const user = useSelector(selectUser)

  return (
    <div className={`Navbar ${window.scroll() > 200 ? 'fixed-navbar' : ''}`} style={{display : `${props.visible}`}}>
      <div className="navbar-element-menu">
        <button>X</button>
      </div>
      <div className="navbar-element-search">
      <Link to="/">Les recettes</Link>
       <div className='searchBar'>
        <img className="icon-navbar" src="images/svg/search.svg"></img>
        <input type="text"></input></div>
      </div>
      <div className="navbar-element-account">
        <Link to={!user ? "/connexion" :"/compte"}>{!user ?"connexion" : 'Mon compte'}</Link>
      </div>
    </div>
  );
}
