const mongoose = require("mongoose")

const questionCollection = mongoose.Schema({
    titleId:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    options:{
        type:Array,
        required:true
    },
    correctAnswer:{
        type:String,
        required:true
    },
    userAnswer:{
        type:String,
        
    }
})

module.exports = questionCollection;