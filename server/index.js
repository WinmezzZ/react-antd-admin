const express = require('express')
const bodyParser = require('body-parser')
// const history = require('connect-history-api-fallback')
const app = express()
const compression = require('compression')
const http = require('http').Server(app);
const port = 1997;

//gzip
app.use(compression());

// 支持history API
// app.use(history())

//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next()
})

//解析body
app.use(bodyParser.urlencoded({ extended: true }))

//静态文件托管
app.use(express.static('./build'));

//API
const { User } = require('./model/config');
app.post('/login', (req, res) => {
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

app.post('/register', (req, res) => {
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

// 开启端口服务
http.listen(port, function() {
    console.log(`Your service is listening at port ${port}`);
});


// 开启socket服务
// const io = require('socket.io')(http);

// io.on('connection', function (socket) {
//   console.log('一位用户成功连接');
//   socket.on('sendMsg', (data) => {
//     console.log(data);
//   });
// socket.on('ferret', (name, fn) => {
//   fn('woot');
// });
// global.users = [];

