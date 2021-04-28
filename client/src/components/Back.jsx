import React from 'react'
import { useHistory} from "react-router-dom";
export default function Back() {
    let history = useHistory()
    const back = () => {
        history.goBack()
      }
    return (
        <span onClick={back} className="back-lastPage">Retour</span>
    )
}
