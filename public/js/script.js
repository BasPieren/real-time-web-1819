'use strict';

import { socket } from './modules/socket.js'
import { getUserData } from './modules/user-data.js'
import * as repo_data from './modules/repo-data.js'

// function repoDataInterval() {
//   repo_data.getRepoData()
//
//   setInterval(repo_data.getRepoData, 10000)
// }

getUserData()
repo_data.saveRepoName()
// repoDataInterval()
socket()
