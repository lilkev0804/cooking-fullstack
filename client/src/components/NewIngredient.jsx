import React from 'react'


export default function NewIngredient(props) {
    return (
             <div className="new-ingredient">
                  <div className="form-group">
                      <h2>Ajouter {props.type}</h2>
                      <textarea rows="1" value={props.value} onChange={props.onChange}></textarea>
                  </div>
                    <button className="add-element" onClick={props.onClick}>ajouter</button>
                </div>
    )
}

 