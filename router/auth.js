const express =require('express');
const bcrypt= require("bcrypt");
const router= express.Router();
const jwt = require('jsonwebtoken');
const authenticate=require("../middleware/authenticate");

require("../db/conn");

const User=require("../model/userSchema");

router.get("/", (req, res) => {
    res.send("Welcome to websitest! router");
});

//using promises


// router.post("/register", (req, res) => {
// //console.log(req.body);
// //res.json({message:req.body});

// const{name,email,phone,work,password,cpassword}=req.body;

// if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({error:"Field is missing"});
// }

// User.findOne({email:email})
// .then((userExist)=>{
//     if (userExist){
//         return res.status(422).json({error:"email already exists"});
//     }

//     const user=new User({name,email,phone,work,password,cpassword});

//     user.save().then(()=>{
//         res.status(201).json({message:"user egistered successfully"});
//     }).catch((error)=>res.status(500).json({message:"failed to register"}));

// })
// .catch(err=>{console.log(err);});



// //console.log(name);
// //console.log(email);

// });


router.post("/register",async (req, res) => {
    //console.log(req.body);
    //res.json({message:req.body});
    
    const{name,email,phone,work,password,cpassword}=req.body;
    
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({error:"Field is missing"});
    }
    try {
     
    const userExist=  await User.findOne({email:email})
    
        if (userExist){
            return res.status(422).json({error:"email already exists"});
        }
        else if(password != cpassword){
            return res.status(422).json({error:"password did not match"});
        }else{
            const user=new User({name,email,phone,work,password,cpassword});
            //middle ware use for hashing passwords
              await  user.save();
                    res.status(201).json({message:"user egistered successfully"});
        }
    
      
        
    }
     catch (error) {
        console.log(error);
    }
  console.log(name);
console.log(email);
    
    });






    router.post('/signin',async (req, res) =>{
try {
    let token;
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({error:"please filled the data"});
    }

    const userLogin =await User.findOne({email:email});
    console.log(userLogin);

    if(userLogin ){
        const isMatch=await bcrypt.compare(password,userLogin.password);
        
         token=await userLogin.generateAuthToken();
         console.log(token);
         res.cookie("jwtoken",token,{
            expires:new Date(Date.now()+25892000000),
            httpOnly:true
         });
       
    if(!isMatch){
        res.status(400).json({error:"Invalid Credentials"});
    }
    else{
         res.json   ({message:"user signin successfully"});
    }
}
else{
    res.status(400).json({error:" Invalid Credentials"});
}
}
 catch (error) {
    console.log(error);
}
    });



router.get("/about",authenticate, (req, res) => {
    console.log("about middleware");
    res.send(req.rootUser);
});


router.get("/getdata",authenticate, (req, res) => {
    console.log("about middleware");
    res.send(req.rootUser);
});


module.exports = router;