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
    info:{
        type: Array,
        required :false
    },
    date: {
        type: Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User', userSchema)