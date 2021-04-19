import React,{useState} from 'react'
import FormSign from "../../components/FormSign";
import FormSignOut from "../../components/FormSignOut";
export default function Connect() {
const [toggleSign, setToggleSign] =useState(true)

const changeSign = (e) => {
    if(e.target.id === "btn-inscription"){
        setToggleSign(true)
    }else{  
        setToggleSign(false)
    }
}
    return (
        <div className="Container connexion-container">
            <div className="select-sign">
                <span className="btn-signInOut" style={{backgroundColor : `${toggleSign ? 'black' : ""}` , color : `${toggleSign ? "white" : ""}` }} onClick={changeSign} id="btn-inscription">S'enregistrer</span>
                <span className="btn-signInOut" style={{backgroundColor : `${toggleSign ? '' : "black"}` , color : `${toggleSign ? "" : "white"}` }} onClick={changeSign} id="btn-connection">Se connecter</span>
            </div>
            <FormSign show={toggleSign ? "flex" : "none"}/>
            <FormSignOut show={toggleSign ? "none" : "flex"}/>
        </div>
    )
}
