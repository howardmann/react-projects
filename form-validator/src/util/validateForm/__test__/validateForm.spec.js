let validateForm = require('../validateForm')

describe('validateForm', () => {
  it('should return true if valid payload', () => {
    let payload = {
      company: '42 PTY LTD',
      email: 'felix@email.com',
      password: '12345678910'
    }

    let input = validateForm(payload)
    let actual = true
    expect(input).toBe(actual)
  })

  it('return array of error of multiple messages if invalid', () => {
    let payload = {
      email: 'felixemail.com',
      password: '1234'
    }

    let input = validateForm(payload)
    let actual = ['company name required', 'felixemail.com is not a valid email', 'password must be min 7 characters']
    expect(input).toEqual(actual)
  })
})