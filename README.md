# Real-Time Web @cmda-minor-web · 2018-2019 ⚙️

This is my repo for the Real-Time Web course

![Real Time Web Screenshot](https://i.imgur.com/XvlQ6Ck.png)
> Learn HTML Together chat app

## Table of Contents 🗃
* [To Do](#to-do-)
* [Description](#description-)
* [Installing](#installing-)
  * [Packages and Technologies](#packages-and-technologies)
* [API](#api)
  * [Authentication](#authentication)
  * [Rate Limit](#rate-limit)
* [Research](#research-)
  * [Skecth](#skecth)
  * [Data Life Cycle](#data-life-cycle)
* [How It Works](#how-it-works-️)
  * [OAuth](#oauth)
  * [Create Repo](#create-repo)
  * [Namespace](#namespace)
  * [Polling Data](#polling-data)
  * [Chat and Terminal](#chat-and-terminal)
* [Sources](#sources-)
  * [Honourable Mentions](#honourable-mentions)
* [Licence](#licence-)

## To Do 📌
This is a list of things I want to do in this project:

- [ ] Deal with real-time complexity
- [ ] Handle real-time client-server interaction
- [ ] Handle real-time data management
- [ ] Handle multi-user support

## Description 📝
For this course I made a web application that allows users to learn HTML together by using a build in text editor and chat. Users can write and discuss the HTML directly from their browser. Users are also able, by using the Github API, to create, commit and push to a Github repo. In the browser users are also able to see the number of commits, issues and stars the repo has. This will be the real time data.

## Installing 🔍
To install this application enter the following into your terminal:
```
git clone https://github.com/BasPieren/real-time-web-1819.git

cd real-time-web-1819

npm install

npm run server
```

### Packages and Technologies
This project makes use of the following packages and technologies:

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [EJS](https://ejs.co/)
* [Socket.io](http://socket.io)
* [Axios](https://www.npmjs.com/package/axios)
* [octokit/rest.js](https://octokit.github.io/rest.js/)

## API 🐒
I made use of the following API for this project:

  * [Github API](https://developer.github.com/v3/)

The Github API has a bunch of different endpoints that you can use:

```
{
  "current_user_url": "https://api.github.com/user",
  "current_user_authorizations_html_url": "https://github.com/settings/connections/applications{/client_id}",
  "authorizations_url": "https://api.github.com/authorizations",
  "code_search_url": "https://api.github.com/search/code?q={query}{&page,per_page,sort,order}",
  "commit_search_url": "https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}",
  "emails_url": "https://api.github.com/user/emails",
  "emojis_url": "https://api.github.com/emojis",
  "events_url": "https://api.github.com/events",
  "feeds_url": "https://api.github.com/feeds",
  "followers_url": "https://api.github.com/user/followers",
  "following_url": "https://api.github.com/user/following{/target}",
  "gists_url": "https://api.github.com/gists{/gist_id}",
  "hub_url": "https://api.github.com/hub",
  "issue_search_url": "https://api.github.com/search/issues?q={query}{&page,per_page,sort,order}",
  "issues_url": "https://api.github.com/issues",
  "keys_url": "https://api.github.com/user/keys",
  "notifications_url": "https://api.github.com/notifications",
  "organization_repositories_url": "https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}",
  "organization_url": "https://api.github.com/orgs/{org}",
  "public_gists_url": "https://api.github.com/gists/public",
  "rate_limit_url": "https://api.github.com/rate_limit",
  "repository_url": "https://api.github.com/repos/{owner}/{repo}",
  "repository_search_url": "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}",
  "current_user_repositories_url": "https://api.github.com/user/repos{?type,page,per_page,sort}",
  "starred_url": "https://api.github.com/user/starred{/owner}{/repo}",
  "starred_gists_url": "https://api.github.com/gists/starred",
  "team_url": "https://api.github.com/teams",
  "user_url": "https://api.github.com/users/{user}",
  "user_organizations_url": "https://api.github.com/user/orgs",
  "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
  "user_search_url": "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}"
}
```
### Authentication
There are two ways to authenticate through the GitHub API. Requests that require authentication will return `404 Not Found`, instead of `403 Forbidden`, in some places. This is to prevent the accidental leakage of private repositories to unauthorized users.

#### Basic authentication
`curl -u "username" https://api.github.com`

#### OAuth2 token (sent in a header)
`curl -H "Authorization: token OAUTH-TOKEN" https://api.github.com`

> Note: GitHub recommends sending OAuth tokens using the Authorization header. GitHub accepts sending OAuth tokens as a query parameter, but it is less secure because URLs can be logged by any system along the request path.

#### OAuth2 key/secret
`curl 'https://api.github.com/users/whatever?client_id=xxxx&client_secret=yyyy'`

Using your `client_id` and `client_secret` does not authenticate as a user, it will only identify your OAuth application to increase your rate limit. Permissions are only granted to users, not applications, and you will only get back data that an unauthenticated user would see. For this reason, you should only use the OAuth2 key/secret in server-to-server scenarios.

### Rate Limit
When there is basic authentication or 0Auth authentication, you can make u to 5000 requests per hour. For unauthenticated requests there is a rate limit of 60 request per hour.

## Research 🕵🏻
Here I explain the research for this project.

### Sketch
This is a sketch of the most important screen.

![Homepage Sketch](https://i.imgur.com/PecHr6X.jpg)
> Homepage sketch

### Data Life Cycle

<details>
  <summary>Version 1</summary>

  ![Data Life Cycle](https://i.imgur.com/cwbVmTx.jpg)
</details>

<details>
  <summary>Version 2</summary>

![Data Life Cycle v2](https://i.imgur.com/iPqdyDn.jpg)
</details>

## How It Works 🛠️
Here I explain the core features of this project.

### OAuth
One of the first core features is to make the user login using OAuth. This is important because we are going to not only 'read' the data from the GitHub API but also 'write'. When the user logs in they authorize the Learn HTML Together web app to read all data and both read and create repo data.

When the user arrives on the home page they can click the 'Sign in with GitHub' button which will send them to the GitHub OAuth environment. When the user authorises the login they get redirect back to the web app.

##### HTML
```html
<a class="rtw-github-login" href="https://github.com/login/oauth/authorize?client_id=858ee90bdd14f311d9d2&scope=user%20repo&redirect_uri=http://localhost:3000/redirect"><i class="fab fa-github"></i> Sign in with GitHub</a>
```

The when the redirect comes in the server starts handling it. The `OAuthRedirect` function starts by swamping the `requestToken` for a randomly generated `accessToken` using a `axios()` HTTP request.

When we have the `accessToken` we redirect the user to the `/create-repo` page and add the `accessToken` to the url. This way we can always use it when we need it. It may not be the most secure way but for now it's fine.

##### Node.js
```js
.get('/redirect', OAuthRedirect)

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
```

### Create Repo
When the user is logged in, they can create a GitHub repo. When they fill in the form and post it the `createRepo` function starts. We use the `octokit/rest.js` npm package to act as a wrapper that makes interacting whit the GitHub API more easy.

We use `createForAuthenticatedUser()` to send the needed parameters for creating a repo:

* __name:__ The repo name.
* __description:__ The repo description.
* __auto_init:__  To create an initial commit with empty README.
* __has_issues:__ To enable issues.

We get the repo name and description form the form the user fills in. When the repo gets created the user gets redirected to the `/dashboard` page

```js
.post('/dashboard', createRepo)

function createRepo(req, res) {
  octokit.repos.createForAuthenticatedUser({
    name: req.body['repo-name'],
    description: req.body['repo-description'],
    auto_init: true,
    has_issues: true
  }).catch(err => console.error(err))

  res.redirect(`/dashboard?access_token=${authAccessToken[0]}`)
}
```

### Namespace
When the user creates a repo the also create a personal `socket.io` namespace which other people are able to join, in theory. When the repo gets created we `emit` the repo name to the server.

##### Javascript
```js
function saveRepoName() {
  const form = document.getElementById('rtw-create-repo'),
        socket = io()

  if (document.body.contains(form)) {
    form.addEventListener('submit', () => {
      let repoName = document.getElementsByName('repo-name')[0].value

      socket.emit('repo name', repoName)

      localStorage.setItem('repoName', repoName)
    })
  }
}
```
The `emit` gets handled by the server and saves the repo name into the `nsp` variable. We pass `nsp` as parameter into `socketTest()` which handles the other `socket.io` functionality's.

##### Node.js
```js
io.on('connection', socket => {
  socket.on('repo name', repoName => {
    let nsp = io.of('/' + repoName)

    runSocket(nsp)
  })
})
```

### Polling Data
On the `/dashboard` page the user is able to see the number of issues, watchers, stars, and forks. We use an `setInterval()` to poll the function every 10 seconds to check for new data and render it.

##### getRepoData()
```js
function getRepoData() {
  const getUrl = window.location.search.substring(1),
        userToken = getUrl.split('access_token=')[1],
        form = document.getElementById('rtw-text-editor-form')

  let repoDataSocket = io('/repo-data'),
      repoName = localStorage.getItem('repoName')

  if (document.body.contains(form)) {
    fetch('https://api.github.com/user/repos', {
      headers: {
        Authorization: 'token ' + userToken
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)

        res.forEach(i => {

          if (i.name === repoName) {
            localStorage.setItem('repoData', JSON.stringify(i))

            render.renderRepoData()
          }
        })
      })
      .catch(err => console.error(err))
  }
}
```
##### Polling
```js
function repoDataInterval() {
  repo_data.getRepoData()

  setInterval(repo_data.getRepoData, 10000)
}

repoDataInterval()
```

### Chat and Terminal
On the `/dashboard` page the user is able to write HTML in a in browser text editor and talk with other people about it using a chat box. Each action has its own `socket.io` emit.

For example when a user connects we use `nsp.emit('user connected')` on the server, we handle that emit client side by adding a 'Username connected' to the chat.  

##### Node.js
```js
function runSocket(nsp) {
  nsp.on('connection', socket => {
    nsp.emit('user connected')

    socket.on('editor input', input => {
      if (input.startsWith('<') && input.endsWith('>')) {
        const getAtrb = /(<)([\w\d]*)/g,
              getAtrbVal = /(>)([\w\d\s\W]*)(<)/g

        let atrb = getAtrb.exec(input),
            atrbVal = getAtrbVal.exec(input)

        nsp.emit('create element', atrb, atrbVal)
      } else if (input.startsWith('/')) {
        const getCommand = /(\/)([\w\d]*)/g

        let command = getCommand.exec(input)

        nsp.emit('call command', command)
      } else {
        nsp.emit('editor input', input)
      }
    })

    socket.on('chat message', msg => {
      let splitMsg = msg.split(' ')

      nsp.emit('new message', splitMsg)
    })

    socket.on('disconnect', () => {
      nsp.emit('user disconnected')
    })
  })
}
```

##### Javascript
```js
function socket() {
  const textEditor = document.getElementById('rtw-text-editor-form'),
        editorInput = document.getElementById('rtw-text-editor'),
        editorOutput = document.getElementById('rtw-text-editor-output'),
        chatBox = document.getElementById('rtw-chat-box-form'),
        chatInput = document.getElementById('rtw-chat-box'),
        chatOutput = document.getElementById('rtw-chat-messages'),
        chatMessages = document.getElementById('rtw-chat-messages'),
        form = document.getElementById('rtw-text-editor-form'),
        socket = io()

  let userName = localStorage.getItem('userName'),
      getRepoName = localStorage.getItem('repoName'),
      dashboard = io('/' + getRepoName)

  editorInput.focus()

  // ---------- TEXT EDITOR ---------- //

  textEditor.onsubmit = (e => {
    e.preventDefault()

    dashboard.emit('editor input', editorInput.value)

    editorInput.value = ''

    return false
  })
  dashboard.on('create element', (atrb, atrbVal) => {
    let createElement = document.createElement(atrb[2])

    createElement.textContent = atrbVal[2]

    editorOutput.appendChild(createElement)
  })
  dashboard.on('call command', command => {
    const p = document.createElement('p')

    p.textContent = 'Lets start with something simple, type "Hello World!" in a <h1> tag.'

    editorOutput.appendChild(p)
  })
  dashboard.on('editor input', input => {
    const p = document.createElement('p')

    p.textContent = 'Not a valid HTML tag'
    p.className = 'rtw-not-valid'

    editorOutput.appendChild(p)
  })

  // ---------- CHATBOX ---------- //

  chatBox.onsubmit = (e => {
    e.preventDefault()

    dashboard.emit('chat message', chatInput.value)

    chatInput.value = ''

    return false
  })
  dashboard.on('new message', splitMsg => {
    let htmlElement = []

    const htmlElementPush = splitMsg.map(e => {
            if (e.startsWith('<') && e.endsWith('>')) {
              const span = document.createElement('span')

              span.textContent = e
              span.className = 'rtw-chat-html'

              htmlElement.push(span)
            }
          }),
          removeHTML = splitMsg.map(e => {
            if (e.startsWith('<') === true) {
              return ''
            } else {
              return e
            }
          }),
          joinMsg = removeHTML.join(' ') ,
          li = document.createElement('li')

    li.textContent = userName + ': ' + joinMsg

    chatOutput.appendChild(li)

    if (htmlElement.length > 0) {
      li.appendChild(htmlElement[0])
    }
  })
  dashboard.on('user connected', () => {
    const li = document.createElement('li')

    li.textContent = userName + ' connected'
    li.className = 'rtw-user-connected'

    chatOutput.appendChild(li)
  })
  dashboard.on('user disconnected', () => {
    const li = document.createElement('li')

    li.textContent = userName + ' disconnected'
    li.className = 'rtw-user-disconnected'

    chatOutput.appendChild(li)
  })
}
```

## Sources 📚
This is a list of all the sources I used during this project:

  * [Socket.io | Get started](https://socket.io/get-started/chat/)
  * [Implementing OAuth 2.0 with Node.js](https://www.sohamkamani.com/blog/javascript/2018-06-24-oauth-with-node-js/)

### Honourable Mentions

  * [Jesse Dijkman](https://github.com/jesseDijkman1/)
  * [Jeroen van Berkum](https://github.com/jeroenvb/)

## Licence 🔓
MIT © [Bas Pieren](https://github.com/BasPieren)
