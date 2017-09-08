var express = require('express');
var router = express.Router();
var moment = require('moment');
var CurrentDate = moment();
var mongojs = require('mongojs');
var dbObj = mongojs('mongodb://dippyhaze:dippyhaze@ds127854.mlab.com:27854/ganjapp', ['expenses']);
var expenseViewModel = require('./../viewModels/month_viewModel');
var expenseDbModel = require('./../models/month');
var singleExpense = expenseDbModel;
var ExpenseSummary = expenseViewModel.MonthSummaryModel;

router.post('/insertNewExpense', function(req, res, next){
    expenseViewModel = req.body;
    singleExpense = new singleMonth(req.body);
    dbObj.expenses.save(singleExpense , function(error,month){
                    if(error){
                        res.send(error);
                    } else {
                        res.json('That\'s Okay Madaffaca! Speriamo che '+singleExpense.BoughtBy+' abbia il Ganjone Oggi!');
                    }
                })
});

router.get('/MonthSummaryExpenses/:id',function(req,res,next){
    var monthString = '';
    var FormattedDate = CurrentDate.format('LLL');
    var SplittedDate = FormattedDate.split(" ");
    monthString = SplittedDate[0];
    var monthInt = (CurrentDate.month() + 1);

    dbObj.expenses.find({userId: req.params.id,MonthNumb:monthInt},function(error,expenses){
            if(error){
                res.send(error);
            }
            else if (expenses) {
                var Summary = new ExpenseSummary({userId:req.params.id, Month: monthString, MonthNumb: monthInt, AmountSpent:0, BoughtBy: [], QualityAVG: 0, QuantityAVG: 0, GPriceAVG: 0});         
                for (var i = 0; i < expenses.length; i++) {
                    if(Summary.BoughtBy[0] !== expenses[i].BoughtBy.toString()){
                        Summary.BoughtBy.push(expenses[i].BoughtBy);
                    }
                    Summary.AmountSpent = Summary.AmountSpent + expenses[i].AmountSpent;
                    Summary.QualityAVG = Summary.QualityAVG + expenses[i].Quality;
                    Summary.QuantityAVG = Summary.QuantityAVG + expenses[i].Quantity;
                    Summary.GPriceAVG = Summary.GPriceAVG + expenses[i].GPrice;
                }
                Summary.QualityAVG = Summary.QualityAVG / expenses.length;
                Summary.QuantityAVG = Summary.QuantityAVG / expenses.length;
                Summary.GPriceAVG = Summary.GPriceAVG / expenses.length;
                res.send(Summary);
            }
            else {
                console.log('No Weed Bought this Month!');
            }
        })
});

router.get('/getAllMonthsExpenses/:id/:monthnmb',function(req,res,next){
    var MonthNumb = parseInt(req.params.monthnmb);

    dbObj.expenses.find({userId: req.params.id,MonthNumb:MonthNumb},function(error,expenses){
            if(error){
                res.send(error);
            }
            else if (expenses) {
                res.send(expenses);
            }
            else {
                console.log('No Weed Bought this Month!');
            }
        })
});

module.exports = router;