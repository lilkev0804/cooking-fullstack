import React, { useEffect, useState } from "react";
import axios from "axios";
import CardRecipe from "../../components/CardRecipe";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

export default function MyRecipes() {
  const [data, setData] = useState([]);
  const [refresh, setrefresh] = useState(false)
  const user = useSelector(selectUser);
  useEffect(() => {
    const fetchData = async () => {
      const req = await axios.get(`http://localhost:3002/recette/user/${user.name}`);
      setData(req.data);
    };
    fetchData();
  }, [refresh]);


  const handleDelete = async (e) => {
    const id = e.target.id;
    const name = e.target.getAttribute("data-img");
    await axios
      .delete(`http://localhost:3002/recette/${id}/${name}`, {})
      .then((res) => setrefresh(!refresh))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="body-espace">
        <div className="breadCrumb">
          <Link to="/compte">Mon espace</Link> / <p>Mes recettes</p>
        </div>
        <div className="containCardMy">
          {data.length < 1 ? <p>Aucune recette pour le moment</p> : data.map((info, index) => (
            <div key={index} className="card-instruction">
              <CardRecipe
                id={`${info._id}`}
                imageUrl={info.pictureName}
                name={info.title}
                prix={info.prix}
              ></CardRecipe>
              <Link to={`/compte/modifier-recettes/${info._id}`} className="btn">Modifier</Link>
              <button
                data-img={info.pictureName}
                id={`${info._id}`}
                onClick={(e) => handleDelete(e)}
                className="btn"
              >
                Supprimer
              </button>
            </div>
          ))}
          {}
        </div>
      </div>
    </>
  );
}
