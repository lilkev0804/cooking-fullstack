import React,{useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios'
function Recette() {
    let { id } = useParams();
    const [datas, setDatas] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const req = await axios.get(`http://localhost:3002/recette/${id}`)
            setDatas(req.data)
        }
        fetchData()
    }, [])
console.log(datas)

    return (
        
        <div className="Container onlyRecipe">
            <h1 className="nameRecipe">{datas.title}</h1>
            <div className="introInfo">
                    <img src="/images/svg/chef.svg"></img>
                    <p>{datas.difficulty}</p>
            </div>
            <div className="introInfo">
                    <img src="/images/svg/euro-green.svg"></img>
                    <p>{datas.prix}</p>
            </div>
            <img className="Imagerecette" src={`/images/${datas.pictureName}`} alt="visuel de la recette"></img>
            <div className="Info-Recipe">
                <div className='infoDuration'>
                    <p>Temps de préparation :</p>
                    <span> {datas.preparationTime}  {datas.preparationTimeFormat}</span>
                </div>
                 <div className='infoDuration'>
                    <p>Temps de repos :</p>
                    <span> {datas.reposTime}  {datas.reposTimeFormat}</span>
                </div>
                 <div className='infoDuration'>
                    <p>Temps de Cuisson :</p>
                    <span> {datas.cuissonTime}  {datas.cuissonTimeFormat}</span>
                </div>
            </div>
            <div className="info-ingredients" >
                <h2>Les ingrédients nécessaires :</h2>
            </div>
            <div className="info-etapes" >
                <h2>Les étapes :</h2>
            </div>
        </div>
    )
}

export default Recette
