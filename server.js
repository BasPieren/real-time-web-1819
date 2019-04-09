'use strict'

const express = require('express'),
      io = require('socket.io'),
      app = express(),
      port = 3000

app
  .set('view engine', 'ejs')
  .set('views', 'views')

  .use(express.static('public'))

  .get('/', homePage)

  .listen(process.env.PORT || port)

function homePage(req, res) {
  res.render('pages/index.ejs')
}
