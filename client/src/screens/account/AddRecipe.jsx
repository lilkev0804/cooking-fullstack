import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import NavEspace from "../../components/NavEspace";
require("dotenv").config();
export default function AddRecipe() {
  const [initialValue, setInitialValue] = useState("");
  const [description, setDescription] = useState("");
  const [addData, setAddData] = useState({
    title: "",
    picture: "",
    pictureName: '',
    timing: "",
    timingFormat: "",
    difficulty: "",
    prix: "",
    ingredients: [""],
    preparationTime: "",
    preparationTimeFormat: "",
    reposTime: "",
    reposTimeFormat: "",
    cuissonTime: "",
    cuissonTimeFormat: "",
    etapes: "",
  });

  const onChange = (e) =>
    setAddData({ ...addData, [e.target.name]: e.target.value });

  const handleEditorChange = (content, editor) => {
    setAddData({ ...addData, etapes: content });
  };

  const catchPicture = (e) => { 
    console.log(e.target.files[0])
    setAddData({ ...addData, picture : e.target.files[0]});
    setAddData({ ...addData, pictureName : e.target.files[0].name.replace(/ /g, '')});
  }

  console.log(addData);

  return (
    <>
      <NavEspace></NavEspace>
      <div className="body-espace">
        <div className="new-recipes">
          <h2>Ajouter une recette</h2>
          <div className="input-recipes">
            <p>
              Ttre :{" "}
              <input
                name="title"
                value={addData.title}
                onChange={onChange}
                type="text"
              ></input>
            </p>
            <div className="choiceImg">
              <input type='file'
              id='file'
              accept='image/png, image/jpeg'
              onChange={catchPicture}></input>
            </div>
            <div className="generalInfo">
              <div className="timing">
                <p>Durée</p>
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
              <div className="difficulty">
                <p>Difficulté</p>
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
                <p>Prix</p>
                <select name="prix" value={addData.prix} onChange={onChange}>
                  <option></option>
                  <option>Economique</option>
                  <option>Abordable</option>
                  <option>Honéreux</option>
                </select>
              </div>
            </div>
            <div className="ingredient"></div>
            <div className="recapTiming">
              <div className="block-info">
                <div className="recapInfo">
                  <p>Préparation</p>
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
                  <p>Repos</p>
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
                  <p>Cuisson</p>
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
                onEditorChange={handleEditorChange}
                init={{
                  height: 500,
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
            <button className="validateRecipe">Valider ma recette</button>
            <button className="SaveRecipe">Sauvegarder ma recette</button>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
