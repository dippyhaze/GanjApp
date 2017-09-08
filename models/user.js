var express = require('express');
var mongoose = require('mongoose');
    
    module.exports = mongoose.model('users',
            { 
                id: String,
                username: String,
                password: String,
                email: String,
                name: String,
                role: String
            }
    );