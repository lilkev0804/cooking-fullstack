import React, { useState, useEffect } from "react";
import {selectUser} from '../../features/userSlice'
import {Link, useHistory} from 'react-router-dom'
import {useSelector} from "react-redux"
export default function MyAccount() {
    const user = useSelector(selectUser)
    let history = useHistory()
    useEffect(() => {
        if(user === null){
            history.push('/connexion')
        }
      }, [])
    return (
        <>
        <div className="body-espace">
                <h1>My account</h1>
                <Link to="/compte/ajouter-recettes">Ajouter de nouvelles recettes</Link>
        </div>
        </>
    )
}
