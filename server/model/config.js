const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/admin', function (err) {
   if (!err) console.log("数据库连接成功");
});

const user = require('../schema/user');
const person = require('../schema/person');

module.exports = {
	User: mongoose.model('user', user, 'user'),
	Person: mongoose.model('person', person, 'person')
} 