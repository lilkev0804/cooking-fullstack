const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min : 6,
        max:255
    },
    password:{
        type: String,
        required: true,
        max:1024,
        min: 8
    },
    avatar:{
        type: String,
        required: false,
        max:2004,
        min: 8
    },
    date: {
        type: Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User', userSchema)