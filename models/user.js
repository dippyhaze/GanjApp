const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("./../config/database");

var userSchema = mongoose.Schema({

    email: {
       type: String,
       required:true
    },
    username: {
       type: String,
       required:true       
    },
    password: {
       required:true,      
       type: String
    },
    role: {
       required:true,      
       type: String
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername = function(Username,callback){
    const query = { username : Username }
    User.findOne(query,callback);
}

module.exports.addUser = function(newUser,callback){
    User.findOne({username: newUser.username},function(error,user){
        if(error){
            res.send(error);
        }
        else if (user) {
            res.send('utente gia presente nel DB');
        }
        else {
            bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err){
                        throw err;
                    } else{
                    newUser.password = hash;
                        newUser.save(callback);
                    }
                });
            });
        }
    }); 
}

module.exports.comparePassword = function(candidatePW,hash,callback){
    bcrypt.compare(candidatePW,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    });
}
