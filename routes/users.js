var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var dbObj = mongojs('mongodb://dippyhaze:dippyhaze@ds127854.mlab.com:27854/ganjapp', ['users']);
var UserViewModel =require('./../viewModels/user_viewModel');
var UserDbModel =require('./../models/user');
var bcrypt = require('bcrypt-nodejs');

// Get All USERS
router.get('/',function(req, res, next){
    dbObj.users.find(function(error,users){
        if(error){
            res.send(error);
        }
        res.json(users);
    })
});

//GET Single User
router.get('/:id',function(req, res, next){
    dbObj.users.findOne({_id: mongojs.ObjectId(req.params.id)},function(error,user){
        if(error){
            res.send(error);
        }
        else{
            res.json(user);
        }
    })
});

//POST Save Users
router.post('/create',function(req, res, next){
   var user = req.body;
   if(!user) {
       res.status = 400;
       res.json({
           error : 'missing Parameters'
       })
   } else {
       dbObj.users.findOne({username: req.body.username},function(error,user){
            if(error){
                res.send(error);
            }
            else if (user) {
                res.send('utente gia presente nel DB');
            }
            else {
                UserDbModel = new UserDbModel(req.body);
                UserViewModel =  new UserViewModel(req.body);

                bcrypt.hash(UserDbModel.password, null,null, function(err, hash) {
                    UserDbModel.password = hash;
                    });
                dbObj.users.save(UserDbModel , function(error,user){
                    if(error){
                        res.send(error);
                    } else {
                        res.json(UserViewModel);
                    }
                })
            }
        })
   }
});

//DELETE Delete user
router.delete('/:id',function(req, res, next){
    dbObj.users.remove({_id: mongojs.ObjectId(req.params.id)},function(error,user){
        if(error){
            res.send(error);
        }
        else{
            res.json(user);
        }
    })
});

//PUT Update user
router.put('/:id',function(req, res, next){
    var user = req.body;
    var updUser = {};

    // if(task.isDone){
    //     updTask.isDone = task.isDone;
    // }
    // if(task.title){
    //     updTask.title = task.title;
    // }
    // if(!updTask){
    //     res.status = 400;
    //     res.json({
    //         error:'Bad Data'
    //     })
    // } else {
    //     dbObj.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask,{},function(error,task){
    //         if(error){
    //             res.send(error);
    //         }
    //         else{
    //             res.json(task);
    //         }
    //     })
    // }
});


module.exports = router;