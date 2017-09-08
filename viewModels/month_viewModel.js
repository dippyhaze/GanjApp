var express = require('express');
var mongoose = require('mongoose');

var MonthSchema = new mongoose.Schema({ 
    userId: String,
    Month: 0,
    MonthNumb: 0,
    AmountSpent: 0,
    BoughtBy: String,
    Quality: 0,
    Quantity: 0,
    GPrice: 0
 });

 var MonthSummary = new mongoose.Schema({
    userId: String,
    Month: String,
    MonthNumb: 0,
    AmountSpent:0,
    BoughtBy: [String],
    QualityAVG: 0,
    QuantityAVG: 0,
    GPriceAVG: 0
})

var MonthSummaryModel = mongoose.model('MonthSummary', MonthSummary);
var MonthViewModel = mongoose.model('MonthViewModel', MonthSchema);

module.exports = {
    MonthViewModel: MonthViewModel,
    MonthSummaryModel: MonthSummaryModel
}