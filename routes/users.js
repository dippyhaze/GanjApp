const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");



router.post('/register',(req,res,next)=>{
    let newUser = new User({
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        role:'user'
    })

    User.addUser(newUser,(err,user) =>{
        if(err){
            res.json({success:false,msg:"Failed to register"});
            return res.send();
        }

        if(!user){
            res.json({success:false,msg:"Missing Parameters"});
        }
        else {
           res.json({success:true,msg:"Okay to register"});
        }
    });
});

router.post('/authenticate',(req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username,(err,user)=>{
        if(err){
            throw err;
        }
        if(!user){
            return res.json({success:false,msg:"no user found"});
        }
        else{
            User.comparePassword(password,user.password,(err,isMatch)=>{
                if(err){
                    throw err;
                }
                if(isMatch){
                    const token = jwt.sign({user},config.secret,{
                        expiresIn:1200
                    });
                    res.send({
                        success:true,
                        token:'jwt '+token,
                        user:{
                            id:user.id,
                            username:user.username,
                            name:user.name,
                            email:user.email,
                            role:user.role,
                        }})
                }
                    else {
                        res.send({success:false,msg:"wrong pw"});
                    }
            });
        }
    })
});

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user:req.user});
});


module.exports = router;