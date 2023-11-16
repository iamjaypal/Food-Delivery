const express=require('express');
const router=express.Router();

const {body, validationResult}=require('express-validator');
const user=require('../Models/User');
const middleware=require('../Middleware/Fetchdetails'); 

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const screatkey="iamsultanbutalso@iamjaypalbhicharfromindia";
router.post("/createuser",
       [body('email').isEmail(),
        body('name').isLength({min :5}),
        body('password', "incorrect password").isLength({min :8})],
    
      async(req,res)=>{

        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const salt=await bcrypt.genSalt(10);
        const securePassword=await bcrypt.hash(req.body.password,salt);
    try {
        
        await user.create({
            name : req.body.name,
            email : req.body.email,
            password : securePassword,
            location : req.body.location,
        }).then(res.json({success : true}))
        
    } catch (err) {
        console.log("Error...",err);
        res.json({success: false});
    }
})

router.post('/getuser', middleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password") // -password will not pick password from db.
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})

router.post("/loginuser",async(req,res)=>{
    let emaildata=req.body.email;
     console.log("detais of login ",emaildata);
    try {
        let userdata =await user.findOne({email: emaildata});
        console.log("this eamil find ",userdata);
        
        const pwdCompair=await bcrypt.compare(req.body.password,userdata.password);

        
        if(!userdata){
            return res.status(400).json({errors:"Write correct Entity"});
        }
        else if(!pwdCompair){
            return res.status(400).json({errors:"Write correct Entity in password"});
        }
        else{
            const data ={
                user:{
                    id:userdata.id
                }
            }
            const authtoken=jwt.sign(data,screatkey);
            return  res.json({success: true,authToken:authtoken});
        }
    } 
    catch (err) {
        console.log("Error...",err);
        res.json({success: false});
    }
})

module.exports=router;