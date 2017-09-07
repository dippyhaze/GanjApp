var express = require('express');
var mongoose = require('mongoose');
var User = require('./../models/user');
    module.exports = UserViewModel = new User(
            { 
                username: String,
                email: String,
                role: String
            }
    );