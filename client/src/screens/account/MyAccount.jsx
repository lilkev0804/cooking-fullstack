import React, { useState, useEffect } from "react";
import { selectUser } from "../../features/userSlice";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../../features/userSlice";
import axios from "axios";

export default function MyAccount() {
  const user = useSelector(selectUser);
  const [datas, setDatas] = useState();
  const [image, setImage] =useState()
  const [file, setFile] = useState({
    data: "",
    name: "",
  });
  let history = useHistory();


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
          const fetchData = async () => {
            const req =  await axios.get(`http://localhost:3002/utilisateur/search/${user.name}`)
            setDatas(req.data[0])
            setImage(req.data[0].avatar)
          }
            fetchData()
      })
      .catch((err) => console.log(err));
  }, []);


  const handleDisconnect = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  const catchPicture = (e) => {
    setFile({
      data: e.target.files[0],
      name: e.target.files[0].name.replace(/ /g, ""),
    });
  };
  const handleUpdateImage = async () => {
    axios
      .put(`http://localhost:3002/utilisateur/${datas._id}`, {
        avatar: file.name,
      })
      .then((res) => {
        console.log(res);
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file.data);
        axios
          .post("http://localhost:3002/upload/avatar", data)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
       if(image){
        axios
        .delete(`http://localhost:3002/upload/avatar/${image}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
       }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="body-espace">
        <aside className="breadcrumb">
          <button onClick={handleDisconnect}>Déconnection</button>
          <Link to="/compte">Mes infos</Link>
          <Link to="/compte/ajouter-recettes">
            Ajouter de nouvelles recettes
          </Link>
          <Link to="/compte/mes-recettes">Mes recettes</Link>
        </aside>
        <div className="generalInfoUser">
          <h1>
            Bienvenue <span className="userConnect">{user.name}</span>
          </h1>
          <div className="choiceAvatar">
            <div className="actualAvatar">
              {!image ? <p>Ajouter votre avatar</p>: <img className="avatar" alt="avatar de l'utilisateur" src={`/images/avatar/${image}`}></img>}
            </div>
            <div className="modifiedAvatar">
              <label for="avartar">Modifier votre avatar : </label>
              <input
                type="file"
                id="file"
                accept="image/png, image/jpeg"
                onChange={catchPicture}
                className="InputImage"
              ></input>
              <button className="btn" onClick={handleUpdateImage}>
                Sauvegarder
              </button>
              
            </div>
          </div>
          <div className="infopersonnel"></div>
          <div className="favorite"></div>
        </div>
      </div>
    </>
  );
}
