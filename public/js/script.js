'use strict';

import { socket } from './modules/socket.js'
import { getUserData } from './modules/user-data.js'
import * as repo_data from './modules/repo-data.js'

const form = document.getElementById('rtw-text-editor-form')

function repoDataInterval() {
  repo_data.getRepoData()

  setInterval(repo_data.getRepoData, 10000)
}

getUserData()
repo_data.saveRepoName()

if (document.body.contains(form)) {
  repoDataInterval()
  socket()
}
