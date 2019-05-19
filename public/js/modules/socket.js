import * as render from './render-data.js'

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

  // ---------- REPO DATA ---------- //

  dashboard.on('repo data', i => {
    console.log('Het blijft een verassing')

    render.renderRepoData(i)
  })

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

export { socket }
