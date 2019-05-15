function getUserData() {
  const getUrl = window.location.search.substring(1),
        userToken = getUrl.split('access_token=')[1]

  fetch('https://api.github.com/user', {
    headers: {
      Authorization: 'token ' + userToken
    }
  })
    .then(res => res.json())
    .then(res => {
      localStorage.setItem('userName', `${res.name}`)
      return res
    })
    .then(res => {
      console.log(res)
      const body = document.querySelector('body'),
            header = document.createElement('header'),
            h3 = document.createElement('h3'),
            a = document.createElement('a'),
            img = document.createElement('img')

			h3.textContent = `${res.name}`
      a.href = 'http://localhost:3000/'
      a.textContent = 'Sign Out'
      img.src = `${res.avatar_url}`

      body.insertBefore(header, body.firstChild)
      header.appendChild(img)
      header.appendChild(h3)
      header.appendChild(a)
    })
    .catch(err => console.error(err))
}

export { getUserData }
