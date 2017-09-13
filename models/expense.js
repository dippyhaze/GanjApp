const mongoose = require("mongoose");
const config = require("./../config/database");

var expenseSchema = mongoose.Schema({
    userId:{
        type: String
    },
    Month: {
       type: String
    },
    MonthNumb: {
       type: Number,
       required:true
    },
    AmountSpent: {
       type: Number,
       required:true       
    },
    BoughtBy: {
       required:true,      
       type: String
    },
    BoughtDate: {
       required:true,      
       type: Date
    },
    Quality: {
       required:true,      
       type: Number
    },
    Quantity: {
       required:true,      
       type: Number
    },
    GPrice: {
       required:true,      
       type: Number
    }
});

var expenseSummarySchema = mongoose.Schema({
    userId:{
        type: String
    },
    Month: {
       type: String
    },
    MonthNumb: {
       type: Number,
       required:true
    },
    AmountSpent: {
       type: Number,
       required:true       
    },
    BoughtBy: {
       required:true,      
       type: []
    },
    QualityAVG: {
       required:true,      
       type: Number
    },
    QuantityAVG: {
       required:true,      
       type: Number
    },
    GPriceAVG: {
       required:true,      
       type: Number
    }
});

var expenseArraySchema = mongoose.Schema({
    ExpensesArray:{
        type: []
    },
    TotalAmount: {
       type: Number
    }
});

const Expense =  mongoose.model('expensesummaries', expenseSchema);
const ExpenseSummary =  mongoose.model('ExpenseSummary', expenseSummarySchema);
const ExpenseArray =  mongoose.model('ExpenseArray', expenseArraySchema);

module.exports = {
    Expense: Expense,
    ExpenseSummary: ExpenseSummary,
    ExpenseArray: ExpenseArray
}

module.exports.getExpenseById = function(id,callback){
    Expense.findById(id,callback);
}

module.exports.getExpenseByMonthNumbAndId = function(MonthNumb,id,callback){
    const query = { MonthNumb : MonthNumb };
    return Expense.find(query,callback);
}

module.exports.getSummaryFromMonthExpenses = function(res,expenses,callback){
    var Summary = new ExpenseSummary({userId:expenses[0].userId, Month: expenses[0].Month, MonthNumb: expenses[0].MonthNumb, AmountSpent:0, BoughtBy: [], QualityAVG: 0, QuantityAVG: 0, GPriceAVG: 0});         
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
            if(expenses[0].userId !== ''){
                res.send(Summary);
            }
            else{
                res.status = 400;
                res.send('missing parameters');
            }
            
}

module.exports.getAllSelectedMonthsExpenses = function(id,MonthNumb,callback){ 
    const query = { MonthNumb : MonthNumb, userId:id };
    return Expense.find(query,callback);
}

module.exports.addExpense = function(newExpense,callback){ 
    newExpense.save(callback);
}