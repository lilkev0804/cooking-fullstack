import React, { useState } from "react";

export default function FormSign(props) {
  const [showPass, setShowPass] = useState(true);
  const [showPassSd, setShowPassSd] = useState("password");

  const handleSubmit = () => {};
  const togglePass = (e) => {
      e.preventDefault()
      if(e.target.id === "click-pass"){
        setShowPass(!showPass)
      }else {
        setShowPassSd(!showPassSd)
      }
      
  };
  return (
    <form onSubmit={handleSubmit} className="form-to-account" style={{display: `${props.show}`}}>
      <div className="form-group-connect">
        <label for="username">Identifiant</label>
        <input name="username" type="text"></input>
      </div>
      <div className="form-group-connect">
        <label for="password">Mot de passe</label>
        <div className="form-password">
          <input name="password" type={showPass ? "password" : ""}></input>
         
            <img id="click-pass" onClick={togglePass}
              className="icone-show-pass"
              src="images/svg/view.svg"
              alt="show password button"
            ></img>
     
        </div>
      </div>
      <div className="form-group-connect">
        <label for="password-confirm">Confirmer Mot de passe</label>
        <div className="form-password">
          <input name="password-confirm" type={showPassSd ? "password" : ""}></input>
         
            <img id="click-passSd" onClick={togglePass}
              className="icone-show-pass"
              src="images/svg/view.svg"
              alt="show password button"
            ></img>
        </div>
      </div>
      <button type="submit">S'enregistrer</button>
    </form>
  );
}
