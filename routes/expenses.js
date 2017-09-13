const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");
const singleExpense = Expense.Expense;
const ExpenseSummary = Expense.ExpenseSummary;
const ExpensesArray = Expense.ExpenseArray;
const config = require("../config/database");
var moment = require('moment');
var CurrentDate = moment();



router.post('/insertNewExpense', (req, res, next) => {
    var monthString = '';
    var FormattedDate = CurrentDate.format('LLL');
    var SplittedDate = FormattedDate.split(" ");
    monthString = SplittedDate[0];
    var monthInt = (CurrentDate.month() + 1);

    let newExpense = new singleExpense({
        userId: req.body.userId,
        Month: monthString,
        MonthNumb: monthInt,
        AmountSpent: req.body.AmountSpent,
        BoughtBy: req.body.BoughtBy,
        BoughtDate: FormattedDate,
        Quality: req.body.Quality,
        Quantity: req.body.Quantity,
        GPrice: req.body.GPrice
    })

    console.log(newExpense);

    Expense.addExpense(newExpense, (err,expense) => {
        if (err) {
            return res.send();
        }
        if (!expense) {
            res.json({ success: false, msg: "Missing Parameters" });
        }
        else {
            res.send({ success: true, msg: "speriamo che " + expense.BoughtBy + ' abbia il ganjone oggi!' });
        }
    });
});

router.get('/MonthSummaryExpenses/:id', function (req, res, next) {
    var monthString = '';
    var FormattedDate = CurrentDate.format('LLL');
    var SplittedDate = FormattedDate.split(" ");
    monthString = SplittedDate[0];
    var monthInt = (CurrentDate.month() + 1);

    Expense.getExpenseByMonthNumbAndId(monthInt, req.params.id, function (error, expenses) {
        if (error) {
            res.status = 400;
            res.send(error);
        }
        else if (expenses) {
            Expense.getSummaryFromMonthExpenses(res, expenses, function (err, summary) {
                console.log(summary);
                if (err) {
                    throw err;
                }
                if (summary) {
                    console.log(summary);
                }
                else {
                    res.send(summary);
                }
            })
        }
        else {
            console.log('No Weed Bought this Month!');
        }
    })
});

router.get('/getAllSelectedMonthsExpenses/:id/:monthnmb',function(req,res,next){
    var MonthNumb = parseInt(req.params.monthnmb);
    Expense.getAllSelectedMonthsExpenses(req.params.id,MonthNumb,function(error,expenses){
        if(error){
                res.send(error);
            }
            else if (expenses) {
               var ExpenseArray = new ExpensesArray({ExpensesArray:[],TotalAmount:0});
                for (var i = 0; i < expenses.length; i++) {
                    ExpenseArray.ExpensesArray.push(expenses[i]);
                    ExpenseArray.TotalAmount = ExpenseArray.TotalAmount + expenses[i].AmountSpent;
                }
                res.send(ExpenseArray)
            }            
            else {
                console.log('No Weed Bought this Month!');
            }
    });
});

router.get('/getAllCurrentMonthsExpenses/:id',function(req,res,next){
    var monthString = '';
    var FormattedDate = CurrentDate.format('LLL');
    var SplittedDate = FormattedDate.split(" ");
    monthString = SplittedDate[0];
    var monthInt = (CurrentDate.month() + 1);
    Expense.getAllSelectedMonthsExpenses(req.params.id,monthInt,function(error,expenses){
        if(error){
                res.send(error);
            }
            else if (expenses) {
               var ExpenseArray = new ExpensesArray({ExpensesArray:[],TotalAmount:0});
                for (var i = 0; i < expenses.length; i++) {
                    ExpenseArray.ExpensesArray.push(expenses[i]);
                    ExpenseArray.TotalAmount = ExpenseArray.TotalAmount + expenses[i].AmountSpent;
                }
                res.send(ExpenseArray)
            }            
            else {
                console.log('No Weed Bought this Month!');
            }
    });
});


module.exports = router;