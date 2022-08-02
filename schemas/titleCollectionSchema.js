const mongoose = require("mongoose")

const titleCollection = mongoose.Schema({
    title:{
        type:String,
        required:true
    }
})

module.exports = titleCollection;