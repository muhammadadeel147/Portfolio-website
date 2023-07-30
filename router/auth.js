const express =require('express');
const bcrypt= require("bcrypt");
const router= express.Router();

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
        console.log(err);
    }
  //console.log(name);
    //console.log(email);
    
    });



// video foloow login page


    router.post('/signin',async (req, res) =>{
try {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({error:"please filled the data"});
    }

    const userLogin =await User.findOne({email:email});
    console.log(userLogin);

    if(userLogin ){
        const isMatch=await bcrypt.compare(password,userLogin.password);
        
       
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





// Self made login page
//     router.post("/login", async (req, res) => {
       
//         const{email,password,}=req.body;
    
//         if ( !email || !password ) {
//             return res.status(422).json({error:"No Empty Field"});
//         }
//         try {
//             const userExist=  await User.findOne({email:email});
// if(userExist) {
//     const userPassword=userExist.password===req.body.password;
//     if(userPassword) {
//         res.status(201).json({message:"user Login successfully"});
//     }
//     else{
//         res.status(500).json({message:"password didnot match"});
//     }

// }
// else{
//     res.status(500).json({message:"user does not exist"});
// }
//         } catch (error) {
//             console.log(error);
//         }

//     });

module.exports = router;