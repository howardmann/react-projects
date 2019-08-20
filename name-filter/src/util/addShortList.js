let addShortList = (data, id) => {
  if (data.includes(id)) return data
  return data.concat(id)
}

module.exports = addShortList