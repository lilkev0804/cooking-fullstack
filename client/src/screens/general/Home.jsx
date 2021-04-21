import React, { useState, useEffect } from "react";
import CardRecipe from "../../components/CardRecipe";

import { topHome } from "../../components/tophome";
import axios from "axios";

export default function Home() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const element = await axios.get("http://localhost:3002/recette");
      setDatas(element.data);
    };
    fetchData();
  }, []);

  return (
    <div className="Container home-general">
      {/* <div className="top-home">
        {topHome.map((idea) => (
          <div key={`idea-${idea.id}`} className="container-bubbleIdea">
            <div className="bubbleIdea"></div>
            <p>{idea.name}</p>
          </div>
        ))}
      </div> */}
      <h1>Toutes nos recettes</h1>
      <div className="all-recipe">
        {datas.map((data, index) => (
          <CardRecipe
            dataI={data._id}
            id={data._id}
            imageUrl={data.pictureName}
            name={data.title}
            key={index}
            prix={data.prix}
            delais={data.timing + " " + data.timingFormat} 
          ></CardRecipe>
        ))}
      </div>
    </div>
  );
}