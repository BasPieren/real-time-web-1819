'use strict'

require('dotenv').config()

const helper = require('./public/js/modules/helper.js'),
      express = require('express'),
      request = require('request'),
      axios = require('axios'),
      bodyParser = require('body-parser'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      port = 3000

const clientID = process.env.CLIENT_ID,
      clientSecret = process.env.CLIENT_SECRET,
      authAccessToken = []

const Octokit = require('@octokit/rest'),
      octokit = new Octokit({
        auth: 'token ' + process.env.ACCESS_TOKEN,
        userAgent: 'octokit/rest.js v1.2.3'
      })

app
  .set('view engine', 'ejs')
  .set('views', 'views')

  .use(express.static('public'))
  .use(bodyParser.urlencoded({ extended: true }))

  .get('/', homePage)
  .get('/redirect', OAuthRedirect)
  .get('/create-repo', createRepoPage)
  .get('/dashboard', dashboardPage)

  .post('/dashboard', createRepo)

function homePage(req, res) {
  res.render('pages/index.ejs')
}

function createRepoPage(req, res) {
  res.render('pages/create-repo.ejs')
}

function dashboardPage(req, res) {
  res.render('pages/dashboard.ejs')
}

function OAuthRedirect(req, res) {
  const requestToken = req.query.code

  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  }).then(response => {
    const accessToken = response.data.access_token

    authAccessToken.push(accessToken)

    res.redirect(`/create-repo?access_token=${accessToken}`)
  }).catch(err => console.error(err))
}

function createRepo(req, res) {
  octokit.repos.createForAuthenticatedUser({
    name: req.body['repo-name'],
    description: req.body['repo-description'],
    auto_init: true,
    has_issues: true
  }).catch(err => console.error(err))

  res.redirect(`/dashboard?access_token=${authAccessToken[0]}`)
}

// ---------- SOCKET.IO ---------- //

io.on('connection', socket => {
  socket.join('some room')

  let userID = socket.id

  io.emit('user connected', userID)

  socket.on('editor input', input => {
    if (input.startsWith('<') && input.endsWith('>')) {
      const getAtrb = /(<)([\w\d]*)/g,
            getAtrbVal = /(>)([\w\d\s\W]*)(<)/g

      let atrb = getAtrb.exec(input),
          atrbVal = getAtrbVal.exec(input)

      io.to('some room').emit('create element', atrb, atrbVal)
    } else if (input.startsWith('/')) {
      const getCommand = /(\/)([\w\d]*)/g

      let command = getCommand.exec(input)

      io.to('some room').emit('call command', command)
    } else {
      io.to('some room').emit('editor input', input)
    }
  })

  socket.on('chat message', msg => {
    let splitMsg = msg.split(' ')

    io.to('some room').emit('new message', splitMsg)
  })

  socket.on('disconnect', () => {
    io.to('some room').emit('user disconnected', userID)
  })
})

http.listen(process.env.PORT || port, () => {
  console.log('listening on *:3000');
});
