import React, { useState, useEffect } from "react";
import axios from "axios";
import CardRecipe from "../../components/CardRecipe";
import Back from "../../components/Back";

export default function RecettePlat() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const req = await axios.get(`http://localhost:3002/recette/type/Plat`);
      setDatas(req.data);
    };
    fetchData();
  }, []);

  return (
    <div className="Container-Recipe">
      <Back></Back>
      <h1>les plat</h1>
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
