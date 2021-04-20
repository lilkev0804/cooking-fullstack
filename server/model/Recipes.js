const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
        max:500,
        min: 8
    },
    proprietaire: {
        type: String,
        required: true,
        max:500,
        min: 8
    },
    title:{
        type: String,
        required: true,
        max:500,
        min: 8
    },
    pictureName:{
        type: String,
        required: true,
        max:1024,
        min: 0
    },
    timing:{
        type: String,
        required: true,
        max:50,
        min: 0,
    },
    timingFormat:{
        type: String,
        required: true,
        max:50,
        min: 0,
    },
    difficulty:{
        type: String,
        required: true,
        max:250,
        min: 0,
    },
    prix:{
        type: String,
        required: true,
        max:50,
        min: 0,
    },
    ingredients:{
        type: String,
        required: true,
        max:5000,
        min: 0,
    },
    preparationTime:{
        type: String,
        required: true,
        max:50,
        min: 0,
    },
    preparationTimeFormat:{
        type: String,
        required: true,
        max:50,
        min: 0,
    },
    reposTime:{
        type: String,
        required: true,
        max:50,
        min: 0,
    },
    reposTimeFormat:{
        type: String,
        required: true,
        max:50,
        min: 0,
    },
    cuissonTime:{
        type: String,
        required: true,
        max:50,
        min: 0,
    },
    cuissonTimeFormat:{
        type: String,
        required: true,
        max:50,
        min: 0,
    },
    etapes:{
        type: String,
        required: true,
        max:5000,
        min: 0,
    }
})

module.exports = mongoose.model('Recipe', userSchema)