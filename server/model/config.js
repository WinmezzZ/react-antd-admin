const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/admin', function (err) {
   if (!err) console.log('MongoDB connected success');
});

const user = require('../schema/user');

// 建立模型
module.exports = {
	User: mongoose.model('user', user, 'user')
} 