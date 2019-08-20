let filterPeople = (data, search) => {
  return data.filter(el => {
    let regex = new RegExp(search,'i')
    let string = el.name
    return string.match(regex)
  })
}

module.exports = filterPeople

