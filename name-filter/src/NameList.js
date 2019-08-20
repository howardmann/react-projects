import React from 'react';
import Name from './Name'

const NameList = (props) => (
  <ul>
    {props.people.map(el => {
      let color = el.sex === 'girl' ? 'pink' : 'navy'
      return <Name key={el.id} id={el.id} name={el.name} color={color} addShortList={props.addShortList}/>
    })}
  </ul>
)

export default NameList