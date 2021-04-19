import React from "react";
import {Link} from 'react-router-dom'

export default function CardRecipe() {
  return <div className="Card-Recipe-Home">
      <div className="bg-card"> 
      <span>Call</span>
      </div>
      <div className="details-card">
      <span><img className="icon-card" src="images/svg/heart.svg" alt="logo heart to add in favorite"/></span>
      <Link className="link-to-recipte">Nom de recette </Link>
      </div>
  </div>;
}
