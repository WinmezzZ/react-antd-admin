// 用户表结构

const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    username: String,
    userpwd: String
});