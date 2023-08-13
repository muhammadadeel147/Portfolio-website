const dotenv = require('dotenv');
const mongoose= require('mongoose');
const express= require('express');
const cookieParser=require('cookie-parser');
const app=express();
app.use(cookieParser());

dotenv.config({path:"./config.env"});
require("./db/conn");
//const User = require("./model/userSchema");
app.use(express.json()); 
app.use(require('./router/auth'));


const PORT=process.env.PORT;

// // const middleware =(req,res,next)=>{
// //     console.log("middleware");
// //     next();
// // }
// app.get("/", (req, res) => {
//     res.send("Welcome to websitest!");
// });

// app.get("/about",middleware, (req, res) => {
//     console.log("about middleware");
//     res.send("Welcome to About us!");
// });

app.listen(PORT, (req, res) => {
    console.log(`http://localhost:${PORT}`);
})