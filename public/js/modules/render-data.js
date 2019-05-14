function renderRepoData() {
  const form = document.getElementById('rtw-text-editor-form')

  let getRepoData = localStorage.getItem('repoData'),
      parseRepoData = JSON.parse(getRepoData)

  console.log(parseRepoData)

  if (document.body.contains(form)) {
    const header = document.querySelector('header'),
          footer = document.querySelector('footer'),
          div = document.createElement('div'),
          h1 = document.createElement('h1'),
          headerP = document.createElement('p'),
          p = document.createElement('p'),
          p2 = document.createElement('p'),
          p3 = document.createElement('p')

    header.innerHTML = ''
    footer.innerHTML = ''
    headerP.innerHTML = '<p>Need help getting started? Type <span>/help</span>. Or look on <a href="https://developer.mozilla.org/nl/docs/Web/HTML" target="_blank">MDN</a>.</p>'

    h1.textContent = parseRepoData.name
    p.textContent = 'Stars: ' + parseRepoData.stargazers_count
    p2.textContent = 'Watchers: ' + parseRepoData.watchers
    p3.textContent = 'Forks: ' + parseRepoData.forks

    header.insertBefore(h1, header.firstChild)
    header.appendChild(headerP)
    footer.appendChild(p)
    footer.appendChild(p2)
    footer.appendChild(p3)
  }
}

export { renderRepoData }
