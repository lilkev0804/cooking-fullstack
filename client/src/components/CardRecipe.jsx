import React from "react";
import { Link } from "react-router-dom";

export default function CardRecipe(props) {
  return (
    <div className="Card-Recipe-Home" data-index={props.dataI}>
      <div
        className="bg-card"
        style={{
          backgroundImage: `url(/images/${props.imageUrl})`,
        }}
      ></div>
      <div className="details-card">
        <span>
          <img
            className="icon-card"
            src="/images/svg/heart.svg"
            alt="logo heart to add in favorite"
          />
        </span>
        <Link className="link-to-recipte" to={`/recette/${props.id}`}>
          {props.name}
        </Link>
        <div className="time-card">
          <img
            className="icon-card"
            src="/images/svg/clock.svg"
            alt="logo timing"
          ></img>
          {props.delais}
        </div>
        <div className="price-card">
         {props.prix}
          <img
            className="icon-card"
            src="/images/svg/euro.svg"
            alt="logo euro"
          ></img>
         
        </div>
      </div>
    </div>
  );
}