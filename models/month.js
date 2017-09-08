var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Month= new Schema({
    userId: String,
    Month: String,
    MonthNumb: Number,
    AmountSpent: Number,
    BoughtBy: String,
    Quality: Number,
    Quantity: Number,
    GPrice: Number
})

var MonthModel = mongoose.model('month', Month);

module.exports = MonthModel;
