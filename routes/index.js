var express = require('express');
var router = express.Router();
import 'bootstrap';

router.get('/', function(req, res, next){
    res.render('index.html');
});

module.exports = router;