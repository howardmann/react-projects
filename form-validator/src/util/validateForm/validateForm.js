let validate = require('validate.js')

let validateForm = (payload) => {
  let schema = {
    company: {
      presence: {
        message: 'company name required'
      },
      length: {
        minimum: 1,
        message: 'company name required'
      }
    },
    email: {
      email: {
        message: (el) => `${el} is not a valid email`
      }
    },
    password: {
      length: {
        minimum: 7,
        message: 'password must be min 7 characters'
      }
    }
  }

  let result = validate(payload, schema, {
    fullMessages: false
  })
  if (!result) {
    return true
  }
  let errorList = []
  for (var key in result) {
    errorList.push(result[key][0])
  }
  return errorList
}

module.exports = validateForm