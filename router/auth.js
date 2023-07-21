const express =require('express');

const router= express.Router();

require("../db/conn");

const User=require("../model/userSchema");

router.get("/", (req, res) => {
    res.send("Welcome to websitest! router");
});

router.post("/register", (req, res) => {
//console.log(req.body);
//res.json({message:req.body});

const{name,email,phone,work,password,cpassword}=req.body;

if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({error:"Field is missing"});
}

User.findOne({email:email})
.then((userExist)=>{
    if (userExist){
        return res.status(422).json({error:"email already exists"});
    }

    const user=new User({name,email,phone,work,password,cpassword});

    user.save().then(()=>{
        res.status(201).json({message:"user egistered successfully"});
    }).catch((error)=>res.status(500).json({message:"failed to register"}));

})
.catch(err=>{console.log(err);});



//console.log(name);
//console.log(email);

});

module.exports = router;