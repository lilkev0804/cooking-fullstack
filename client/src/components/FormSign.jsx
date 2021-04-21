import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function FormSign(props) {
  const [showPass, setShowPass] = useState(true);
  const [showPassSd, setShowPassSd] = useState("password");
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [passwordsd, setPasswordsd] = useState();
  const [message, setMessage] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    if (password !== passwordsd) {
      setMessage(!message);
    } else {
      e.preventDefault();
      axios
        .post("http://localhost:3002/auth/register", {
          name: user,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("token", res.headers["x-access-token"])
          dispatch(login(
              {
                name: user,
              }
          ))
          history.push('/compte')
          setMessage(true)
        })
        .catch((error) => {
          console.log(error)
        });
    }
  };

  const togglePass = (e) => {
    e.preventDefault();
    if (e.target.id === "click-pass") {
      setShowPass(!showPass);
    } else {
      setShowPassSd(!showPassSd);
    }
  };
  return (
    <div className="form-to-account" style={{ display: `${props.show}` }}>
      <div className="form-group-connect left" >
        <label for="username">Identifiant :</label>
        <input
          name="username"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        ></input>
      </div>
      <div className="form-group-connect">
        <label for="password">Mot de passe :</label>
        <div className="form-password">
          <input
            name="password"
            type={showPass ? "password" : ""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <img
            id="click-pass"
            onClick={togglePass}
            className="icone-show-pass"
            src="images/svg/view.svg"
            alt="show password button"
          ></img>
        </div>
      </div>
      <div className="form-group-connect">
        <label for="password-confirm">Confirmer Mot de passe :</label>
        <div className="form-password">
          <input
            name="password-confirm"
            type={showPassSd ? "password" : ""}
            value={passwordsd}
            onChange={(e) => setPasswordsd(e.target.value)}
          ></input>

          <img
            id="click-passSd"
            onClick={togglePass}
            className="icone-show-pass"
            src="images/svg/view.svg"
            alt="show password button"
          ></img>
        </div>
      </div>
      <button className="btn" onClick={handleSubmit}>S'enregistrer</button>
      {message ? "" : <p>Information erreur sur votre mot de passe</p>}
    </div>
  );
}
