const express = require('express')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
const app = express()
const compression = require('compression')
const path = require('path')
const http = require('http').Server(app)
const port = 1997
const user = require('./router/user')
const person = require('./router/person')

// gzip
app.use(compression());


// history API
app.use(history())

// CORS设置
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  next()
})

// 解析body
app.use(bodyParser.urlencoded({ extended: true }))

// 静态文件托管
app.use(express.static(path.join(__dirname, 'build')));

// api
app.use('/api', user)
app.use('/api', person)

// 开启服务
http.listen(port, function() {
    console.log(`正在监听:${port}端口`);
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

