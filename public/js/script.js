'use strict';

(() => {
  const socket = io(),
        form = document.querySelector('form'),
        m = document.getElementById('m'),
        ul = document.getElementById('messages')

  form.onsubmit = (e => {
    e.preventDefault()

    socket.emit('chat message', m.value)

    m.value = ''

    return false
  })
  socket.on('chat message', msg => {
    const li = document.createElement('li')

    li.textContent = msg

    ul.appendChild(li)
  })
})()
