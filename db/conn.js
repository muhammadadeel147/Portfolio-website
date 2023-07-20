const mongoose= require("mongoose");
const DB=process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log("DB connection established");
}).catch((error)=>console.log("Error connecting"));



