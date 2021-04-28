import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export default function Navbar(props) {
  const [burgerMenu, setBurgerMenu] = useState(true);
  const [scroll, setScroll] = useState(false);
  const user = useSelector(selectUser);
  const handleMenu = () => {
    setBurgerMenu(!burgerMenu);
  };

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  });

  return (
    <div
      className={`Navbar`}
      style={{
        display: `${props.visible}`,
        position: `${scroll ? "fixed" : "relative"}`,
      }}
    >
      <div className="transition"></div>
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
      <Link to="/" className="navbar-element-search">
        <p className="logoWeb">Mauritius</p>
        <img
          alt="Drapeau de l'ile maurice"
          className="maurituisFlag"
          src="/images/svg/mauritius.svg"
        ></img>
        <p className="logoWeb">Recipes</p>
      </Link>
      <div className="navbar-element-account">
        <Link to={user === null ? "/connexion" : "/compte"}>
          {user === null ? "Connexion" : "Mon compte"}
        </Link>
      </div>
    </div>
  );
}
