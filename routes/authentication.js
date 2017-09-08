var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://dippyhaze:dippyhaze@ds127854.mlab.com:27854/ganjapp');
var mongojs = require('mongojs');
var dbObj = mongojs('mongodb://dippyhaze:dippyhaze@ds127854.mlab.com:27854/ganjapp', ['users']);
var DbUser = require('./../models/user');
var UserViewModel = require('./../viewModels/user_viewModel');
var jwt  = require('jsonwebtoken');

router.post('/', function(req, res, next){
    dbObj.users.findOne({
        username : req.body.username
    }, function(err, user) {

        if (err){
            res.send(err.message || '** no unicorns here **');
            throw err;
        } 

        if (!user) {
            // TODO: Gestione Errori 
            res.send({ success: false, message: 'Authentication failed. User not found.' });
        
        } else if (user) {
        // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }   else {
                    UserViewModel = new UserViewModel(user);
                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign({'user': UserViewModel},'token')
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        user: UserViewModel
                    });
                }   
        }
    });
});

module.exports = router;