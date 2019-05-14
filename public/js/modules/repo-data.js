import * as render from './render-data.js'

function getRepoData() {
  const getUrl = window.location.search.substring(1),
        userToken = getUrl.split('access_token=')[1],
        form = document.getElementById('rtw-text-editor-form')

  let repoName = localStorage.getItem('repoName')

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

function saveRepoName() {
  const form = document.getElementById('rtw-create-repo')

  if (document.body.contains(form)) {
    form.addEventListener('submit', () => {
      let repoName = document.getElementsByName('repo-name')[0].value

      localStorage.setItem('repoName', repoName)
    })
  }
}

export { getRepoData, saveRepoName }
