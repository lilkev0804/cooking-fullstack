import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { selectUser } from "../../features/userSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

require("dotenv").config();
export default function AddRecipe() {
  const user = useSelector(selectUser);
  let history = useHistory();
  const [initialValue, setInitialValue] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] =useState(false)
  const [file, setFile] = useState({
    data: "",
    name: "",
  });
  const [addData, setAddData] = useState({
    type: "",
    proprietaire: user.name,
    title: "",
    pictureName: "",
    timing: "",
    timingFormat: "",
    difficulty: "",
    prix: "",
    ingredients: "",
    preparationTime: "",
    preparationTimeFormat: "",
    reposTime: "",
    reposTimeFormat: "",
    cuissonTime: "",
    cuissonTimeFormat: "",
    etapes: "Aucune",
  });

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

  const handleEditorChange = (content, editor) => {
    setAddData({ ...addData, etapes: content });
  };
  const handleEditorChangeSD = (content, editor) => {
    setAddData({ ...addData, ingredients: content });
  };

  const catchPicture = (e) => {
    setFile({
      data: e.target.files[0],
      name: e.target.files[0].name.replace(/ /g, ""),
    })
    setAddData({ ...addData, pictureName: e.target.files[0].name.replace(/ /g, "") })
  };
  
  const handleSubmit = async () => {
    await axios
      .post("http://localhost:3002/recette/ajouter", {
        ...addData,
      })
      .then( (res) => {
        setMessage(!message)
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

console.log(addData)

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
                Nom De la recette :{" "}
                <input
                  name="title"
                  value={addData.title}
                  onChange={onChange}
                  type="text"
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
                type="file"
                id="file"
                accept="image/png, image/jpeg"
                onChange={catchPicture}
              />
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
              <Editor
                initialValue={initialValue}
                apiKey="d8vdl5fl2jv5okarhsoyy3i8cbbxi05lls70wrap220pcut6"
                name="text"
                outputFormat='text'
                onEditorChange={handleEditorChangeSD}
                init={{
                  height: 400,
                  forced_root_block: false,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image",
                    "charmap print preview anchor help",
                    "searchreplace visualblocks code",
                    "a_tinymce_plugin",
                    "insertdatetime media table paste wordcount",
                  ],
                  toolbar: "Numlist",
                }}
              />
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
              <Editor
                initialValue={initialValue}
                apiKey="d8vdl5fl2jv5okarhsoyy3i8cbbxi05lls70wrap220pcut6"
                name="text"
                outputFormat='text'
                onEditorChange={handleEditorChange}
                init={{
                  height: 400,
                  forced_root_block: false,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image",
                    "charmap print preview anchor help",
                    "searchreplace visualblocks code",
                    "a_tinymce_plugin",
                    "insertdatetime media table paste wordcount",
                  ],
                  toolbar: "Numlist",
                }}
              />
            </div>
          </div>
          <div className="group-btn">
            {message ? <p>Recette Poster</p> : ""}
            <button className="validateRecipe" onClick={handleSubmit}>
              Valider ma recette
            </button>
            <button className="SaveRecipe">Sauvegarder ma recette</button>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
