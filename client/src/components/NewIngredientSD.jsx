import React from 'react'
export default function NewIngredientSD(props) {
    return (
             <div className="new-ingredient adding">
                 {props.id}
                  <div className="form-group">
                      <p>{props.ingredient}</p>
                  </div>
                    <button className="supp-element" onClick={props.onClick}>Supprimer</button>
                </div>
    )
}