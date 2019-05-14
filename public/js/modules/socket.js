function socket() {
  const socket = io(),
        textEditor = document.getElementById('rtw-text-editor-form'),
        editorInput = document.getElementById('rtw-text-editor'),
        editorOutput = document.getElementById('rtw-text-editor-output'),
        chatBox = document.getElementById('rtw-chat-box-form'),
        chatInput = document.getElementById('rtw-chat-box'),
        chatOutput = document.getElementById('rtw-chat-messages'),
        chatMessages = document.getElementById('rtw-chat-messages'),
        form = document.getElementById('rtw-text-editor-form')

  if (document.body.contains(form)) {

    editorInput.focus()

    // ---------- TEXT EDITOR ---------- //

    textEditor.onsubmit = (e => {
      e.preventDefault()

      socket.emit('editor input', editorInput.value)

      editorInput.value = ''

      return false
    })
    socket.on('create element', (atrb, atrbVal) => {
      let createElement = document.createElement(atrb[2])

      createElement.textContent = atrbVal[2]

      editorOutput.appendChild(createElement)
    })
    socket.on('call command', command => {
      const p = document.createElement('p')

      p.textContent = 'Lets start with something simple, type "Hello World!" in a <h1> tag.'

      editorOutput.appendChild(p)
    })
    socket.on('editor input', input => {
      const p = document.createElement('p')

      p.textContent = 'Not a valid HTML tag'
      p.className = 'rtw-not-valid'

      editorOutput.appendChild(p)
    })

    // ---------- CHATBOX ---------- //

    chatBox.onsubmit = (e => {
      e.preventDefault()

      socket.emit('chat message', chatInput.value)

      chatInput.value = ''

      return false
    })
    socket.on('new message', splitMsg => {
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

      li.textContent = joinMsg

      chatOutput.appendChild(li)

      if (htmlElement.length > 0) {
        li.appendChild(htmlElement[0])
      }
    })
    socket.on('user connected', userID => {
      const li = document.createElement('li')

      li.textContent = userID + ' connected'
      li.className = 'rtw-user-connected'

      chatOutput.appendChild(li)
    })
    socket.on('user disconnected', userID => {
      const li = document.createElement('li')

      li.textContent = userID + ' disconnected'
      li.className = 'rtw-user-disconnected'

      chatOutput.appendChild(li)
    })
  }
  }

export { socket }
