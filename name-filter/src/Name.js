import React from 'react';

const Name = (props) => {
  let action = props.addShortList ? props.addShortList : props.deleteShortList
  return (
    <li style={{color: props.color}} onClick={() => action(props.id)}>
      {props.name} 
    </li>
  )
}

export default Name