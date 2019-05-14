function renderRepoData() {
  const form = document.getElementById('rtw-text-editor-form')

  let getRepoData = localStorage.getItem('repoData'),
      parseRepoData = JSON.parse(getRepoData)

  if (document.body.contains(form)) {
    const titleSection = document.getElementById('rtw-title-section'),
          divMetaData = document.createElement('div'),
          divRepoData = document.createElement('div'),
          repoName = document.createElement('h1'),
          pDescription = document.createElement('p'),
          helpText = document.createElement('p'),
          pStars = document.createElement('p'),
          pWatchers = document.createElement('p'),
          pForks = document.createElement('p'),
          pIssues = document.createElement('p')

    titleSection.innerHTML = ''
    helpText.innerHTML = 'Need help getting started? Type <span>/help</span> in the terminal. Or look on <a href="https://developer.mozilla.org/nl/docs/Web/HTML" target="_blank">MDN</a>.'

    pDescription.className = 'rtw-repo-description'

    repoName.textContent = parseRepoData.name
    pDescription.textContent = parseRepoData.description
    pIssues.textContent = 'Issues: ' + parseRepoData.open_issues
    pWatchers.textContent = 'Watchers: ' + parseRepoData.watchers
    pStars.textContent = 'Stars: ' + parseRepoData.stargazers_count
    pForks.textContent = 'Forks: ' + parseRepoData.forks

    titleSection.appendChild(divMetaData)
    titleSection.appendChild(divRepoData)
    divMetaData.appendChild(repoName)
    divMetaData.appendChild(pDescription)
    divMetaData.appendChild(helpText)
    divRepoData.appendChild(pIssues)
    divRepoData.appendChild(pWatchers)
    divRepoData.appendChild(pStars)
    divRepoData.appendChild(pForks)
  }
}

export { renderRepoData }
