'use strict';

(() => {
  const socket = io(),
        textEditor = document.getElementById('rtw-text-editor-form'),
        editorInput = document.getElementById('rtw-text-editor'),
        chatBox = document.getElementById('rtw-chat-box-form'),
        chatInput = document.getElementById('rtw-chat-box'),
        chatMessages = document.getElementById('rtw-chat-messages')

  editorInput.focus()

  textEditor.onsubmit = (e => {
    e.preventDefault()

    socket.emit('editor input', editorInput.value)

    editorInput.value = ''

    return false
  })
  socket.on('editor input', input => {
    const editorOutput = document.getElementById('rtw-text-editor-output'),
          li = document.createElement('li')

    if (input.startsWith('<') && input.endsWith('>')) {
      const getAtrb = /(<)([\w\d]*)/g,
            getAtrbVal = /(>)([\w\d\s\W]*)(<)/g

      let atrb = getAtrb.exec(input),
          atrbVal = getAtrbVal.exec(input),
          createElement = document.createElement(atrb[2])

      createElement.textContent = atrbVal[2]

      editorOutput.appendChild(createElement)
    } else if (input === '/help') {
      const p = document.createElement('p')

      p.textContent = 'Lets start with something simple, type "Hello World!" in a <h1> tag.'

      editorOutput.appendChild(p)
    } else {
      const p = document.createElement('p')

      p.textContent = 'Not a valid HTML tag'
      p.className = 'rtw-not-valid'

      editorOutput.appendChild(p)
    }
  })

  chatBox.onsubmit = (e => {
    e.preventDefault()

    socket.emit('chat message', chatInput.value)

    chatInput.value = ''

    return false
  })
  socket.on('chat message', msg => {
    const chatOutput = document.getElementById('rtw-chat-messages'),
          li = document.createElement('li')

    li.textContent = msg

    chatOutput.appendChild(li)
  })
})()
