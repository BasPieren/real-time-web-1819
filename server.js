'use strict'

const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      port = 3000

app
  .set('view engine', 'ejs')
  .set('views', 'views')

  .use(express.static('public'))

  .get('/', homePage)

function homePage(req, res) {
  res.render('pages/index.ejs')
}

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

io.on('connection', socket => {
  socket.on('chat message', msg => {
    console.log('message ' + msg)
    io.emit('chat message', msg)
  })
})

http.listen(port, () => {
  console.log('listening on *:3000');
});
