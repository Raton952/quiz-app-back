const express = require('express');
const mongoose = require("mongoose")
const router = express.Router();
const cors = require("cors");
require("dotenv").config()


const app = express();
const port = process.env.PORT || 5000;
const userHandler = require("./routeHandler/userHandler")
const quizHandler = require("./routeHandler/quizHandler")


app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

// database connection
mongoose.connect("mongodb+srv://raton:940sWTnBQFGKxT5c@cluster0.gbuagbg.mongodb.net/quiz_app?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Successful!");
}).catch(err=>{
    console.log(err);
})

// application route
app.use("/user",userHandler)
app.use("/quiz",quizHandler)


// default error error handler
const  errorHandler = (err,req,res,next)=>{
    if (res.headersSent) {
        return next(err)
    }
}

app.use(errorHandler)


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
