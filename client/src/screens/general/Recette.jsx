import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImagePriceDetails from "../../components/ImagePriceDetails";
import ImageDifficultyWhite from "../../components/ImageDifficultyWhite";
import ToTop from "../../components/ToTop";
import Back from "../../components/Back";
function Recette() {
  let { id } = useParams();
  const [datas, setDatas] = useState([]);
  const [ingredients, setIngredient] = useState([])
  const [etapes, setEtapes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const req = await axios.get(`http://localhost:3002/recette/${id}`);
      setDatas(req.data);
      setIngredient(req.data.ingredients)
      setEtapes(req.data.etapes)
    };
    fetchData();
  }, []);


  

  return (
    <div className="Container onlyRecipe">
      <Back></Back>
      <h1 className="nameRecipe">{datas.title}</h1>
      <p>Une recette de <span className="UserRecipe">{datas.proprietaire}</span></p>
      <p>Recette pour {datas.personne} personne{parseInt(datas.personne) > 1 ? "s" : null}</p>
      <div className="introInfo">
        {datas.difficulty === "Simple" ? (
          <ImageDifficultyWhite/>
        ) : datas.difficulty=== "Moyen" ? (
          <>
           <ImageDifficultyWhite/><ImageDifficultyWhite/>
          </>
        ) : (
          <>
            <ImageDifficultyWhite/><ImageDifficultyWhite/><ImageDifficultyWhite/>
          </>
        )}
        <p>{datas.difficulty}</p>
      </div>
      <div className="introInfo">
        {datas.prix === "Economique" ? (
          <ImagePriceDetails />
        ) : datas.prix === "Abordable" ? (
          <>
            <ImagePriceDetails /> <ImagePriceDetails />
          </>
        ) : (
          <>
            <ImagePriceDetails /> <ImagePriceDetails /> <ImagePriceDetails />
          </>
        )}
        <p>{datas.prix}</p>
      </div>
      <img
        className="Imagerecette"
        src={`/images/recettes/${datas.pictureName}`}
        alt="visuel de la recette"
      ></img>
      <div className="Info-Recipe">
        <div className="infoDuration">
          <p>Temps de préparation :</p>
          <span>
            <p>{datas.preparationTime} {datas.preparationTimeFormat}</p>
          </span>
        </div>
        <div className="infoDuration">
          <p>Temps de repos :</p>
          <span>
            {datas.reposTime === "" || datas.reposTime === "0"  ? <p>Aucun temps de repos</p> : <p>{datas.reposTime} {datas.reposTimeFormat}</p> }
          </span>
        </div>
        <div className="infoDuration">
          <p>Temps de cuisson :</p>
          <span>
            <p>{datas.cuissonTime} {datas.cuissonTimeFormat}</p>
          </span>
        </div>
      </div>
      <div className="info-ingredients">
        <h2>Les ingrédients nécessaires :</h2>
       <ul>
        {ingredients.map((ingredient, i ) => (
          <li>{ingredient}</li>
        ))}
       </ul>
      </div>
      <div className="info-etapes">
        <h2>Les étapes :</h2>
        <ol>
        {etapes.map((etape, i ) => (
          <li>{etape}</li>
        ))}
       </ol>
      </div>
      <ToTop></ToTop>
    </div>
  );
}

export default Recette;
