var express = require('express');
var mongoose = require('mongoose');
    
    module.exports = mongoose.model('Users',
            { 
                id: String,
                username: String,
                password: String,
                email: String,
                name: String,
                lastname: String,
                role: String
            }
    );


// var mario = new User({ name: 'mario' });
// mario.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('mario');
//   }
// });