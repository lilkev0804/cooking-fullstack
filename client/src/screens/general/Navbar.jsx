import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export default function Navbar(props) {
  const [burgerMenu, setBurgerMenu] = useState(true);
  const user = useSelector(selectUser);
  const handleMenu = () => {
    setBurgerMenu(!burgerMenu);
  };

  return (
    <div
      className={`Navbar ${window.scroll() > 200 ? "fixed-navbar" : ""}`}
      style={{ display: `${props.visible}` }}
    >
      <div
        className="burgerMenuContainer"
        style={{ display: `${burgerMenu === true ? "none" : "flex"}` }}
      >
        <span
          className="closeburger"
          onClick={(e) => setBurgerMenu(!burgerMenu)}
        >
          X
        </span>
        {/* <Link className="link-burger" onClick={e => setBurgerMenu(!burgerMenu)}>Recette du jours</Link> */}
        <Link
          to="/"
          className="link-burger"
          onClick={(e) => setBurgerMenu(!burgerMenu)}
        >
          Toute les recettes
        </Link>
        <Link
          to="/recettes/entre"
          className="link-burger"
          onClick={(e) => setBurgerMenu(!burgerMenu)}
        >
          Les entrées
        </Link>
        <Link
          to="/recettes/plat"
          className="link-burger"
          onClick={(e) => setBurgerMenu(!burgerMenu)}
        >
          Les plats
        </Link>
        <Link
          to="/recettes/dessert"
          className="link-burger"
          onClick={(e) => setBurgerMenu(!burgerMenu)}
        >
          Les desserts
        </Link>
      </div>
      <div className="navbar-element-menu">
        <div
          className="block-input-menu"
          onClick={(e) => setBurgerMenu(!burgerMenu)}
        >
          <span className="block-menu"></span>
          <span className="block-menu"></span>
          <span className="block-menu"></span>
          <span className="block-menu"></span>
        </div>
      </div>
      <div className="navbar-element-search">
        <Link className="logoWeb" to="/">
          Recipes
        </Link>
        <div className="searchBar">
          <img className="icon-navbar" src="/images/svg/search.svg"></img>
          <input type="text"></input>
        </div>
      </div>
      <div className="navbar-element-account">
        <Link to={user === null ? "/connexion" : "/compte"}>
          {user === null ? "Connexion" : "Mon compte"}
        </Link>
      </div>
    </div>
  );
}