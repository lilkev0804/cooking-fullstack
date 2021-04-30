import React from 'react'
export default function NewIngredientSDModified(props) {
    return (
             <div id={props.identifiant} className="new-ingredient addi">
                 {props.id}
                  <div className="form-group">
                      <p>{props.ingredient}</p>
                      <textarea value={props.value} name="ingredients" onChange={props.onChange} placeholder={props.placeholder} className="TextArea-Add"></textarea>
                  </div>
                    {/* <button className="supp-element" onClick={props.update}>MAJ</button> */}
                    <button className="supp-element" onClick={props.onClick}>Supprimer</button>
                </div>
    )
}
