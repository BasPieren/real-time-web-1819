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
      const body = document.querySelector('body'),
            nav = document.createElement('nav'),
            h3 = document.createElement('h3'),
            a = document.createElement('a'),
            img = document.createElement('img')

			h3.textContent = `${res.name}`
      a.href = 'http://localhost:3000'
      a.textContent = 'Sign Out'
      img.src = `${res.avatar_url}`

      body.insertBefore(nav, body.firstChild)
      nav.appendChild(img)
      nav.appendChild(h3)
      nav.appendChild(a)
    })
    .catch(err => console.error(err))
}

export { getUserData }
