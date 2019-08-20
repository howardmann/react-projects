let filterPeople = require('../filterPeople.js')
let data = [
  {
    id: 0,
    name: 'Jack',
    sex: 'girl'
  }, {
    id: 1,
    name: 'Maja',
    sex: 'boy'
  }, {
    id: 2,
    name: 'Quinn',
    sex: 'girl'
  }, {
    id: 3,
    name: 'Kai',
    sex: 'boy'
  }, {
    id: 4,
    name: 'Elijah',
    sex: 'boy'
  }
]

describe('filterPeople', () => {
  it('should return filtered results matching search pattern', () => {
    let input = filterPeople(data, "ja")
    let actual = [
      {
        id: 0,
        name: 'Jack',
        sex: 'girl'
      }, {
        id: 1,
        name: 'Maja',
        sex: 'boy'
      }, {
        id: 4,
        name: 'Elijah',
        sex: 'boy'
      }
    ]
    expect(input).toEqual(actual)
  })
  it('should return empty array if no pattern match', () => {
    let input = filterPeople(data,'123')
    let actual = []
    expect(input).toEqual(actual)
  })
  it('should return full array if empty search pattern', () => {
    let input = filterPeople(data,"")
    let actual = data
    expect(input).toEqual(actual)
  })
})