var express = require('express');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({ username: 'string', email: 'string', role: 'string' });
module.exports = UserViewModel = mongoose.model('UserViewModel', schema);
    