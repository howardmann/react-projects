let addShortList = require('../addShortList')
let data = [1,2,3,4,5,10]

describe('addShortList', () => {
  it('should add id to array', () => {
    let input = addShortList(data, 12)
    let actual = [1,2,3,4,5,10,12]
    expect(input).toEqual(actual)
  })
  it('should return same array if id already exists', () => {
    let input = addShortList(data, 1)
    let actual = [1, 2, 3, 4, 5, 10]
    expect(input).toEqual(actual)
  })
})