import React from 'react'
import {Link} from 'react-router-dom'

export default function NavEspace() {

    const disconnect = () => { 
        console.log("deconnection")
    }

    return (
        <div className="nav-espace">
            <Link to="/compte/mes-recettes"> Mes recettes</Link>
            <Link to="/compte/ajouter-recettes"> Ajouter des recettes</Link>
            <Link to="/compte/mon-compte"> Mon profils</Link>
            <button className="disconnect-user" onClick={disconnect}>Se deconnecter</button>
        </div>
    )
}
