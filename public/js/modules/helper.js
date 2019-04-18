// Get the date of yeserday. By: Jeroen van Berkum
function getYesterday() {
  const today = new Date()

  let dd = today.getDate(),
      mm = today.getMonth() + 1,
      yyyy = today.getFullYear()

  if (dd < 10) dd = `0${dd}`
  if (mm < 10) mm = `0${mm}`

  if (dd - 1 === 0) {
    return `${yyyy}-${mm - 1}-${30}`
  } else {
    return `${yyyy}-${mm}-${dd - 1}`
  }
}

module.exports = { getYesterday }
