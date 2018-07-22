// 人员表结构

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    sex: Number,
    bornDate: String,
    education: String,
    nation: String,
    nativePlace: String,
    nowPlace: String,
    phone: String,
    workDate: String,
    apartment: String,
    role: String,
    statu: Boolean
});