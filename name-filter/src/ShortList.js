import React from 'react'
import Name from './Name'

const ShortList = (props) => {
  let {data, shortList} = props 
  let favList = shortList.map(el => {
    let fav = data[el]
    let name = fav.name
    let id = fav.id
    let color = fav.sex === 'girl' ? 'pink' : 'navy'
    return (
      <Name key={id} id={id} name={name} color={color} deleteShortList={props.deleteShortList}/>
    )
  }) 
  return (
    <ul>
      {favList}
    </ul>    
  )
}

export default ShortList