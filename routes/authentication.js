var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://dippyhaze:dippyhaze@ds127854.mlab.com:27854/ganjapp');
var User = mongoose.model('Users', { username: String, password: String , confirmPassword: String,email: String,name: String,lastname: String, role: String });

var mario = new User({ name: 'mario' });
mario.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('mario');
  }
});

router.get('/', function(req, res, next){
    res.render('index.html');
});

module.exports = router;