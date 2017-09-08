var express = require('express');
var cors = require('cors');
const path = require('path');
var body_parser = require('body-parser');
var mongoose = require('mongoose');
var jwt  = require('jsonwebtoken');
var User = require('./models/user');

var port = 3000;

var index = require('./routes/index.js');
var users = require('./routes/users.js');
var expenses = require('./routes/expenses.js');
var auth = require('./routes/authentication.js');

var app = express();
app.use(cors());

//Connecting to DB
mongoose.connect('mongodb://dippyhaze:dippyhaze@ds127854.mlab.com:27854/ganjapp');
// View Engine
app.set('views', path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

// Static Folder
app.use(express.static(path.join(__dirname,'/client')));

// Setting body_parser MiddleWare
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended : false}));

// Setting base path
app.use('/', index);
app.use('/api/users', users);
app.use('/api/login', auth);
app.use('/api/expenses', expenses);

// Connecting with the server
app.use((err, req, res, next) => {
  console.log(err.stack || err.message);
  if (res.headersSent)
    return next(err)
  res.status(500).send('Internal Server Error')
})
app.listen(port,function(){
    console.log('you are connected on the port: '+ port);
});