const express = require('express')
const router = express.Router()
 
//API
const { User } = require('../model/config');

router.post('/login', (req, res) => {
  User.findOne(req.body, (err, data) => {
    if (err) { throw  err }
    if (data) {
      res.send({
        code: 0,
        msg: '登陆成功！'
      })
    }else {
      res.send({
        code: 1,
        msg: '用户名或密码错误！'
      })
    }
  });
});

router.post('/register', (req, res) => {
  const { username, userpwd } = req.body
  User.findOne({ username }, (err, data) => {
    if (data) {
        res.send({
          code: 1,
          msg: '用户名已经存在！'
        })
    } else {
        User.create(req.body, (error) => {
            if (error) { throw error }
            res.send({
              code: 0,
              msg: '注册成功！'
            })
        })
    }
  })
})

module.exports = router;
 