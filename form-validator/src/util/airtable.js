const Airtable = require('airtable')
const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY
const base = new Airtable({
  apiKey: AIRTABLE_API_KEY
}).base('appb85dMKBgfu5syW')

let listUsers = () => {
  return new Promise( resolve => {
    base('Table 1').select({
      maxRecords: 10,
      view: 'Grid view'
    }).eachPage(records => {
      let result = records.map(el => el._rawJson.fields)
      resolve(result)
    })
  }) 
}

module.exports = {
  listUsers
}