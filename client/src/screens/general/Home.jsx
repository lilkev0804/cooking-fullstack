import React from "react";
import CardRecipe from "../../components/CardRecipe";

import { topHome } from "../../components/tophome";

export default function Home() {
  return (
    <div className="Container home-general">
      <div className="top-home">
        {topHome.map((idea) => (
          <div key={`idea-${idea.id}`} className="container-bubbleIdea">
            <div className="bubbleIdea"></div>
            <p>{idea.name}</p>
          </div>
        ))}
      </div>
      <div className="all-recipe">
       <CardRecipe></CardRecipe>
       <CardRecipe></CardRecipe>
       <CardRecipe></CardRecipe>
       <CardRecipe></CardRecipe>
      </div>
    </div>
  );
}
