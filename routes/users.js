var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var dbObj = mongojs('mongodb://dippyhaze:dippyhaze@ds127854.mlab.com:27854/ganjapp', ['Users']);

// Get All USERS
router.get('/',function(req, res, next){
    dbObj.Users.find(function(error,users){
        if(error){
            res.send(error);
        }
        res.json(users);
    })
});

//GET Single User
router.get('/:id',function(req, res, next){
    dbObj.Users.findOne({_id: mongojs.ObjectId(req.params.id)},function(error,user){
        if(error){
            res.send(error);
        }
        else{
            res.json(user);
        }
    })
});

//POST Save Users
router.post('/',function(req, res, next){
   var user = req.body;
   if((!user.title) || (user.isDone + '')){
       res.status = 400;
       res.json({
           error : 'missing Parameters'
       })
   } else {
       dbObj.Users.save(task , function(error,user){
           if(error){
               res.send(error);
           } else {
               res.json(user);
           }
       })
   }
});

//DELETE Delete user
router.delete('/:id',function(req, res, next){
    dbObj.Users.remove({_id: mongojs.ObjectId(req.params.id)},function(error,user){
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