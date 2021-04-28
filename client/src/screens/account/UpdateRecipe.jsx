import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import NewIngredient from "../../components/NewIngredient";

require("dotenv").config();

export default function AddRecipe() {
    const user = useSelector(selectUser);
  let history = useHistory();

  const [message, setMessage] = useState(false);
  const [file, setFile] = useState({
    data: "",
    name: "",
  });
  const [addData, setAddData] = useState({
    type: "",
    personne:'',
    proprietaire: user.name,
    title: "",
    pictureName: "",
    timing: "",
    timingFormat: "",
    difficulty: "",
    prix: "",
    ingredients: "Aucun",
    preparationTime: "",
    preparationTimeFormat: "",
    reposTime: "",
    reposTimeFormat: "",
    cuissonTime: "",
    cuissonTimeFormat: "",
    etapes: "Aucune",
  });
  const [actualImg, setActualImg] = useState()
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
        const res = await axios.get(`http://localhost:3002/recette/${id}`);
        setAddData({ type: res.data.type ,title: res.data.title ,personne : res.data.personne,pictureName: res.data.pictureName,timing: res.data.timing , timingFormat: res.data.timingFormat, difficulty: res.data.difficulty,prix: res.data.prix, ingredients: res.data.ingredients, preparationTime: res.data.preparationTime ,preparationTimeFormat: res.data.preparationTimeFormat , reposTime : res.data.reposTime , reposTimeFormat : res.data.reposTimeFormat , cuissonTime : res.data.cuissonTime ,cuissonTimeFormat : res.data.cuissonTimeFormat ,etapes : res.data.etapes})
        setActualImg(res.data.pictureName);
      };
      fetchData();
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
console.log(addData.personne)
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
  const handleSubmit = async () => {
    await axios
      .put(`http://localhost:3002/recette/modified/${id}`, {
        title : addData.title,
        personne: addData.personne,
        type: addData.type,
        proprietaire: user.name,
        pictureName: addData.pictureName,
        timing: addData.timing,
        timingFormat: addData.timingFormat,
        difficulty: addData.difficulty,
        prix: addData.prix,
        ingredients: addData.ingredients,
        preparationTime: addData.preparationTime,
        preparationTimeFormat: addData.preparationTimeFormat,
        reposTime: addData.reposTime,
        reposTimeFormat: addData.reposTimeFormat,
        cuissonTime: addData.cuissonTime,
        cuissonTimeFormat: addData.cuissonTimeFormat,
        etapes: addData.etapes,
      })
      .then((res) => {
        setMessage(!message)
        axios
        .delete(`http://localhost:3002/upload/picture/${actualImg}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
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


  return (
    <>
      <div className="body-espace">
        <div className="breadCrumb">
          <Link to="/compte">Mon espace</Link> /  <Link to="/compte/mes-recettes"> Mes recettes</Link>  /  <p>Modifier des recettes</p>
        </div>
        <div className="new-recipes">
          <h1 className="titleModified">Modifier la recette </h1>
          <h2>Information general de la recette</h2>
          <div className="input-recipes">
            <div className="first-info">
              <p>
                Nom De la recette :
                <input
                  name="title"
                  value={addData.title}
                  onChange={onChange}
                  type="text"
                  
                ></input>
              </p>
              <p>
                Type :{" "}
                <select
                  name="type"
                  placeholder={addData.type}
                  value={addData.type}
                  onChange={onChange}
                >
                  <option></option>
                  <option>Entrée</option>
                  <option>Plat</option>
                  <option>Dessert</option>
                </select>
              </p>
            </div>
            <div className="choiceImg">
              <input
                type="file"
                id="file"
                accept="image/png, image/jpeg , image/webp"
                onChange={catchPicture}
              />
            </div>
            <div className="numberPersonne">
              <p>Recette pour  </p>
              <input type="text" name="personne" value={addData.personne}
                    onChange={onChange}></input>
              <p>personne{parseInt(addData.personne) > 1 ? "s" :null} .</p>
            </div>
            <div className="generalInfo">
              <div className="timing">
                <p>Durée : </p>
                <div>
                  <input
                    type="text"
                    name="timing"
                    value={addData.timing}
                    onChange={onChange}
                  ></input>
                  <select
                    name="timingFormat"
                    value={addData.timingFormat}
                    onChange={onChange}
                  >
                    <option></option>
                    <option>Heures</option>
                    <option>Minutes</option>
                  </select>
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
              <h2>Les ingredients</h2>
              <div>{addData.ingredients}</div>
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
              <h2>Les étapes</h2>
             <div>{addData.etapes}</div>
            </div>
          </div>
          <div className="group-btn">
            {message ? <p>Recette Modifier</p> : ""}
            {message ? <Link className="btn" to="/compte/mes-recettes"> Retour à mes recette</Link> :<button className="btn" onClick={handleSubmit}>
              Modifier ma recette
            </button> }
            
          </div>
        </div>
      </div>
      ;
    </>
  );
}
