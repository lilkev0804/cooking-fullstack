import React, { useState, useEffect } from "react";
import CardRecipe from "../../components/CardRecipe";
import { useDispatch } from "react-redux";
import axios from "axios";
import LocomotiveScroll from 'locomotive-scroll';

export default function Home() {
  const [datas, setDatas] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const element = await axios.get("http://localhost:3002/recette");
      setDatas(element.data);
    };
    fetchData();
  }, []);
  const scroll = new LocomotiveScroll();
  console.log(scroll)

  return (
    <div data-scroll-container>
      <div data-scroll-section
        className="hero"
        style={{ backgroundImage: `url("/assets/hero-bg.jpg")` }}
      >
        <h1 data-scroll className="title">Le voyage dans votre assiettes</h1>
      </div>

      <div data-scroll-section className="Container home-general">
        <h1 data-scroll style={{ textAlign: "center" }}>Toutes nos recettes</h1>
        <div className="all-recipe">
          {datas.map((data, index) => (
            <CardRecipe
              dataI={data._id}
              id={data._id}
              imageUrl={data.pictureName}
              name={data.title}
              key={index}
              prix={data.prix}
              delais={(data.timing ? data.timing : null) + data.timingFormat}
            ></CardRecipe>
          ))}
        </div>
      </div>
    </div>
  );
}
