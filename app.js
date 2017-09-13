const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

mongoose.connect(config.database);

mongoose.connection.on('connected', (err) =>{
    if(err){
        console.log('something wrong with db connection:' + err);
    }
    console.log('connected to db '+config.database);
})

const app = express();
//set CLIENT static folder in which we'll append all FRONTEND project
app.use(express.static(path.join(__dirname,'client')));
// routes path
const users = require("./routes/users");
const expenses = require("./routes/expenses");
// port number
const port = 3000;
// cors middleware
app.use(cors());
// bodyparser middleware
app.use(bodyParser.json());
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);
// enrty point
app.get("/", (req,res) => {
    res.send('hello');
});
// redirect to the selected control
app.use('/users',users);
app.use('/expenses',expenses);

// starting connection
app.listen(port,function(err,done){
    if(err){
        console.log('something wrong');
    }
    else{
        console.log('you re connected on port: '+ port);
    }
})
