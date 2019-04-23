'use strict'

require('dotenv').config()

const helper = require('./public/js/modules/helper.js'),
      express = require('express'),
      axios = require('axios'),
      app = express(),
      request = require('request'),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      port = 3000

const clientID = process.env.CLIENT_ID,
      clientSecret = process.env.CLIENT_SECRET

app
  .set('view engine', 'ejs')
  .set('views', 'views')

  .use(express.static('public'))

  .get('/', homePage)
  .get('/redirect', (req, res) => {
    const requestToken = req.query.code

    axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
        accept: 'application/json'
      }
    }).then(response => {
      const accessToken = response.data.access_token

      res.redirect(`/dashboard?access_token=${accessToken}`)
    }).catch(err => console.error(err))
  })
  .get('/dashboard', dashboardPage)

function homePage(req, res) {
  res.render('pages/index.ejs')
}

function dashboardPage(req, res) {
  res.render('pages/dashboard.ejs')
}

// ---------- SOCKET.IO ---------- //

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
