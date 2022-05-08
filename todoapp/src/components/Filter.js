import React from 'react'

const Filter = (props) => (
  <div>
    <p>Filter: <i>shortcut keys: a (all), d (done), n (not done)</i> </p>
    <select value={props.filter} onChange={props.handleFilter}>
      <option value="SHOW_ALL">SHOW ALL</option>
      <option value="SHOW_DONE">DONE</option>
      <option value="SHOW_NOT_DONE">NOT DONE</option>
    </select>
  </div>
)

export default Filter