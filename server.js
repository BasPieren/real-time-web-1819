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
  let userID = socket.id

  io.emit('user connected', userID)

  socket.on('editor input', input => {
    if (input.startsWith('<') && input.endsWith('>')) {
      const getAtrb = /(<)([\w\d]*)/g,
            getAtrbVal = /(>)([\w\d\s\W]*)(<)/g

      let atrb = getAtrb.exec(input),
          atrbVal = getAtrbVal.exec(input)

      io.emit('create element', atrb, atrbVal)
    } else if (input.startsWith('/')) {
      const getCommand = /(\/)([\w\d]*)/g

      let command = getCommand.exec(input)

      io.emit('call command', command)
    } else {
      io.emit('editor input', input)
    }
  })

  socket.on('chat message', msg => {
    let splitMsg = msg.split(' ')

    io.emit('new message', splitMsg)
  })

  socket.on('disconnect', () => {
    io.emit('user disconnected', userID)
  })
})

http.listen(process.env.PORT || port, () => {
  console.log('listening on *:3000');
});
