const express = require('express')
const router = express.Router()
 
//API
const { Person } = require('../model/config')

// 查
router.get('/person/list', (req, res) => {
  const limit = parseInt(req.query.limit);
  const pageNum = parseInt(req.query.pageNum);
  const name = req.query.name;
  const query = Person.find({ name: new RegExp(name)});
  query.skip((pageNum - 1) * limit);
  query.limit(limit);
  query.exec((err,resu) => {
    if (err) { throw  err }
    Person.find((err,result) => {
      res.json({
        code: 0,
        data: {
          rows: resu,
          total:result.length
        }
      });
    });

    
  });
});

// 增
router.post('/person/add', (req, res) => {
  Person.create(req.body, (err) => {
    if (err) { throw err }
    res.send({
      code: 0,
      msg: '添加成功'
    })
  })
});

// 改
router.post('/person/update', (req, res) => {
  const { _id } = req.body
  Person.update({ _id }, req.body, (err) => {
    if (err) { throw err }
    res.send({
      code: 0,
      msg: '修改成功'
    })
  })
});

// 删
router.post('/person/delete', (req, res) => {
  const { _id } = req.body
  Person.remove({ _id }, (err) => {
    if (err) { throw err }
    res.send({
      code: 0,
      msg: '删除成功'
    })
  })
});

module.exports = router;
 