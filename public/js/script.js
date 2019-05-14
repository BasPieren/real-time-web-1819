'use strict';

import { socket } from './modules/socket.js'
import { getUserData } from './modules/user-data.js'
import { getRepoData } from './modules/repo-data.js'
import * as render from './modules/render-data.js'

function saveRepoName() {
  const form = document.getElementById('rtw-create-repo')

  if (document.body.contains(form)) {
    form.addEventListener('submit', () => {
      let repoName = document.getElementsByName('repo-name')[0].value

      localStorage.setItem('repoName', repoName)
    })
  }
}

saveRepoName()
getUserData()
getRepoData()
render.renderRepoData()
// socket()
