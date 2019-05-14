function renderRepoData() {
  const form = document.getElementById('rtw-text-editor-form')

  let getRepoData = localStorage.getItem('repoData'),
      parseRepoData = JSON.parse(getRepoData)

  if (document.body.contains(form)) {
    const  header = document.querySelector('header'),
           h1 = document.createElement('h1')

    h1.textContent = parseRepoData.name

    header.insertBefore(h1, header.firstChild)
  }
}

export { renderRepoData }
