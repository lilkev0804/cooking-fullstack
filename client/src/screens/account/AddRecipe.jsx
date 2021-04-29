import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import NewIngredient from "../../components/NewIngredient";
import NewIngredientSDModified from "../../components/NewIngredientSDModified";

import { Editor } from "@tinymce/tinymce-react";

require("dotenv").config();

export default function AddRecipe() {
  const [textConcept, setTextConcept] = useState("");
  const user = useSelector(selectUser);
  let history = useHistory();
  const [message, setMessage] = useState(false);
  const [catchIngredient, setCatchIngredient] = useState();
  const [catchStep, setCatchStep] = useState();
  const [file, setFile] = useState({
    data: "",
    name: "",
  });
  const [ingredient, setIngredient] = useState([]);
  const [etapes, setEtape] = useState([]);
  const [addData, setAddData] = useState({
    type: "",
    personne: "",
    proprietaire: user.name,
    // proprietaire: "kevin",
    title: "",
    pictureName: "",
    timing: "",
    timingFormat: "",
    difficulty: "",
    prix: "",
    preparationTime: "",
    preparationTimeFormat: "",
    reposTime: "",
    reposTimeFormat: "",
    cuissonTime: "",
    cuissonTimeFormat: "",
  });

  const [alertIngredient, setAlertIngredient] = useState(false);
  const [alertStep, setAlertStep] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      method: "POST",
      url: "http://localhost:3002/auth/protect",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.data.mess === "null") {
          history.push("/connexion");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const onChange = (e) =>
    setAddData({ ...addData, [e.target.name]: e.target.value });

  const catchPicture = (e) => {
    setFile({
      data: e.target.files[0],
      name: e.target.files[0].name.replace(/ /g, ""),
    });
    setAddData({
      ...addData,
      pictureName: e.target.files[0].name.replace(/ /g, ""),
    });
  };
  const addIngredient = () => {
    if (catchIngredient === undefined || catchIngredient === "") {
      setAlertIngredient(true);
      setTimeout(() => {
        setAlertIngredient(false);
      }, 4000);
    } else {
      setIngredient((oldArray) => [...oldArray, catchIngredient]);
      setCatchIngredient("");
    }
  };

  const addStep = () => {
    if (catchStep === undefined || catchStep === "") {
      setAlertStep(true);
      setTimeout(() => {
        setAlertStep(false);
      }, 4000);
    } else {
      setEtape((oldArray) => [...oldArray, catchStep]);
      setCatchStep("");
    }
  };

  const handleSubmit = async (e) => {
    await axios
      .post("http://localhost:3002/recette/ajouter", {
        ...addData,
        ingredient,
        etapes,
      })
      .then((res) => {
        setMessage(!message);
      })
      .catch((err) => console.log(err));
    const data = new FormData();
    data.append("name", file.name);
    data.append("file", file.data);
    await axios
      .post("http://localhost:3002/upload", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const deleteIngredient = (i, e) => {
    let index = ingredient.indexOf(ingredient[i]);
    ingredient.splice(index, 1);
    document.querySelector(`#ingredient-${i}`).style.display = "none";
  };
  const deleteEtape = (i, e) => {
    let index = etapes.indexOf(etapes[i]);
    etapes.splice(index, 1);
    document.querySelector(`#etapes-${i}`).style.display = "none";
  };
  const updateElement = (i, e) => {
    ingredient.splice(i, 1, e.target.value);
  };
  const updateEtape = (i, e) => {
    etapes.splice(i, 1, e.target.value);
  };

  const handleEditorChange = (content, editor) => {
    setTextConcept(content);
  };
  console.log(textConcept);

  return (
    <>
      <div className="body-espace">
        <div className="breadCrumb">
          <Link to="/compte">Mon espace</Link> / <p>Ajouter des recettes</p>
        </div>
        <div className="new-recipes">
          <h2>Information general de la recette</h2>
          <div className="input-recipes">
            <div className="first-info">
              <p>
                Nom de la recette :{" "}
                <input
                  name="title"
                  value={addData.title}
                  onChange={onChange}
                  type="text"
                  className="mini-input"
                ></input>
              </p>
              <p>
                Type :{" "}
                <select name="type" value={addData.type} onChange={onChange}>
                  <option></option>
                  <option>Entrée</option>
                  <option>Plat</option>
                  <option>Dessert</option>
                </select>
              </p>
            </div>
            <div className="choiceImg">
              <input
                className="add-element"
                type="file"
                id="file"
                accept="image/png, image/jpeg , image/webp"
                onChange={catchPicture}
              />
            </div>
            <div className="numberPersonne">
              <p>Recette pour </p>
              <input
                type="text"
                name="personne"
                value={addData.personne}
                onChange={onChange}
              ></input>
              <p>personne{parseInt(addData.personne) > 1 ? "s" : null} .</p>
            </div>
            <div className="generalInfo">
              <div className="timing">
                <p>Durée total: </p>
                <div>
                  <input
                    type="text"
                    name="timing"
                    value={addData.timing}
                    onChange={(e) =>
                      setAddData({
                        ...addData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  ></input>{" "}
                  h
                  <input
                    name="timingFormat"
                    type="text"
                    value={addData.timingFormat}
                    onChange={(e) =>
                      setAddData({
                        ...addData,
                        [e.target.name]: e.target.value,
                      })
                    }
                  ></input>{" "}
                  min
                </div>
              </div>
              <div className="difficulty">
                <p>Difficulté :</p>
                <select
                  name="difficulty"
                  value={addData.difficulty}
                  onChange={onChange}
                >
                  <option></option>
                  <option>Simple</option>
                  <option>Moyen</option>
                  <option>Difficile</option>
                </select>
              </div>
              <div className="price">
                <p>Prix :</p>
                <select name="prix" value={addData.prix} onChange={onChange}>
                  <option></option>
                  <option>Economique</option>
                  <option>Abordable</option>
                  <option>Honéreux</option>
                </select>
              </div>
            </div>
            <div className="ingredient">
              <div className="container-add">
                <NewIngredient
                  type="un ingredient"
                  onClick={addIngredient}
                  value={catchIngredient}
                  onChange={(e) => setCatchIngredient(e.target.value)}
                ></NewIngredient>
                {alertIngredient ? (
                  <p className="alertAdd">Merci de renseigner un ingredient</p>
                ) : null}
                <div className="container-recipeAdd">
                  {ingredient.map((ing, i) => (
                    <NewIngredientSDModified
                      identifiant={`ingredient-${i}`}
                      placeholder={ing}
                      onChange={(e) => updateElement(i, e)}
                      onClick={(e) => deleteIngredient(i, e)}
                    ></NewIngredientSDModified>
                  ))}
                </div>
              </div>
            </div>
            <div className="recapTiming">
              <h2>Le Timing</h2>
              <div className="block-info">
                <div className="recapInfo">
                  <p>Préparation :</p>
                  <div>
                    <input
                      type="text"
                      name="preparationTime"
                      value={addData.preparationTime}
                      onChange={onChange}
                    ></input>
                    <select
                      name="preparationTimeFormat"
                      value={addData.preparationTimeFormat}
                      onChange={onChange}
                    >
                      <option></option>
                      <option>Heures</option>
                      <option>Minutes</option>
                    </select>
                  </div>
                </div>
                <div className="recapInfo">
                  <p>Repos :</p>
                  <div>
                    <input
                      type="text"
                      name="reposTime"
                      value={addData.reposTime}
                      onChange={onChange}
                    ></input>
                    <select
                      name="reposTimeFormat"
                      value={addData.reposTimeFormat}
                      onChange={onChange}
                    >
                      <option></option>
                      <option>Heures</option>
                      <option>Minutes</option>
                    </select>
                  </div>
                </div>
                <div className="recapInfo">
                  <p>Cuisson :</p>
                  <div>
                    <input
                      type="text"
                      name="cuissonTime"
                      value={addData.cuissonTime}
                      onChange={onChange}
                    ></input>
                    <select
                      name="cuissonTimeFormat"
                      value={addData.cuissonTimeFormat}
                      onChange={onChange}
                    >
                      <option></option>
                      <option>Heures</option>
                      <option>Minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="stepRecipe">
              <div className="container-add">
                <NewIngredient
                  type="une etape"
                  onClick={addStep}
                  value={catchStep}
                  onChange={(e) => setCatchStep(e.target.value)}
                ></NewIngredient>
                {alertStep ? (
                  <p className="alertAdd">Merci de renseigner une étape .</p>
                ) : null}
                <div className="container-recipeAdd">
                  {etapes.map((ing, i) => (
                    <NewIngredientSDModified
                      identifiant={`etapes-${i}`}
                      placeholder={ing}
                      onChange={(e) => updateEtape(i, e)}
                      onClick={(e) => deleteEtape(i, e)}
                    ></NewIngredientSDModified>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="group-btn">
            {message ? <p>Recette Poster</p> : ""}
            {message ? (
              <Link className="validateRecipe" to="/compte/mes-recettes">
                Toutes mes recettes
              </Link>
            ) : (
              <button className="validateRecipe" onClick={handleSubmit}>
                Valider ma recette
              </button>
            )}
          </div>
  
        </div>
      </div>
      ;
    </>
  );
}
