import React, { Component } from 'react';
import PEOPLE from './people.js'
import NameList from './NameList'
import Search from './Search'
import ShortList from './ShortList'
import filterPeople from './util/filterPeople'
import addShortList from './util/addShortList'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: PEOPLE,
      people: PEOPLE,
      search: "",
      shortList: []
    }
  }

  handleChange = async (e) => {
    let search = e.target.value
    await this.setState({search})
    await this.filterPeople()
  }

  filterPeople = () => {
    let newPeople = filterPeople(this.state.data, this.state.search)
    this.setState({people: newPeople})
  }

  addShortList = (id) => {
    let newShortList = addShortList(this.state.shortList, id)
    this.setState({shortList: newShortList})
  }

  deleteShortList = (id) => {
    let newShortList = this.state.shortList.filter(el => el !== id)
    this.setState({shortList: newShortList})
  }

  render() {
    return (
      <div>
        <h1>BABY NAMES</h1>
        
        <Search search={this.state.search} handleChange={this.handleChange}/>
        <ShortList data={this.state.data} shortList={this.state.shortList} deleteShortList={this.deleteShortList}/>
        <hr/>
        <NameList people={this.state.people} addShortList={this.addShortList} />
      </div>
    );
  }
}

export default App;
