import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import {login} from '../features/userSlice'
import { useHistory } from "react-router-dom";
import axios from "axios"

export default function FormSignOut(props) {
  const [showPass, setShowPass] = useState(true);
  const [user, setUser] = useState()
  const [password, setPassword] = useState()
  const [message , setMessage] = useState(true)

  const  dispatch = useDispatch()
  const history = useHistory()
  const handleSubmit = async (e) => {
      e.preventDefault()
     await axios
      .post("http://localhost:3002/auth/login", {
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
        setMessage(false)
        setTimeout(() => {
          setMessage(true)
        }, 3000);
      });
  }

  const togglePass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };


  return (
    <form onSubmit={handleSubmit} className="form-to-account" style={{display: `${props.show}`}}>
      <div className="form-group-connect left">
        <label for="username">Identifiant :</label>
        <input name="username" type="text" value={user} onChange={(e) => setUser(e.target.value)}></input>
      </div>
      <div className="form-group-connect">
        <label for="password">Mot de passe :</label>
        <div className="form-password">
          <input name="password" type={showPass ? "password" : ""} value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <img
            id="click-pass"
            onClick={togglePass}
            className="icone-show-pass"
            src="images/svg/view.svg"
            alt="show password button"
          ></img>
        </div>
      </div>
      <button className="btn" type="submit">Se connecter </button>
      {message ? '' : <p>Information non valide</p>}
    </form>
  );
}
