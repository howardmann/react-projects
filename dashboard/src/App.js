import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import TodoApp from './TodoApp/App'

const SideBar = (props) => (
  <div id="sidebar-wrapper">
    <div style={{cursor: 'pointer', textAlign: 'center'}} onClick={props.toggleMenu}>
      &#9776;
    </div>

    <ul>
      <li>
        <NavLink exact to="/" activeStyle={{backgroundColor: 'red'}}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/admin" activeStyle={{backgroundColor: 'blue'}}>Admin</NavLink>
      </li>
      <li>
        <a href="/secret">Secret</a>
      </li>
      <li>
        <NavLink to="/player" activeStyle={{backgroundColor: 'red'}}>Player</NavLink>
      </li>
      <li>
        <NavLink to="/todo" activeStyle={{backgroundColor: 'red'}}>TodoApp</NavLink>
      </li>
    </ul>
  </div>
)

const Home = (props) => (
  <div>
    <h1>Home Page</h1>
    This is a home page
  </div>
)

const Admin = (props) => (
  <div>
    <h1>Admin Page</h1>
    This is an admin page
  </div>
)

const Secret = (props) => (
  <div>
    <h1>Secret page</h1>
    Secret shh
  </div>
)

const Player = (props) => (
  <div>
    <h1>Player</h1>
    <p>Name: {props.match.params.name}</p>
  </div>
)

  
const Main = (props) => (
  <div id="page-content-wrapper" className="border border-2 border-blue">
    <p>There should be stuff here</p>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/admin' component={Admin}/>
      <Route path='/secret' component={Secret}/>
      <Route exact path='/player' component={Player}/>
      <Route path='/player/:name' component={Player}/>
      <Route path='/todo' component={TodoApp}/>
    </Switch>
  </div>
)

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      showMenu: false
    }
  }
  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }
  render() {
    return (
      <div id="wrapper" className={this.state.showMenu ? 'toggled' : null}>
        <SideBar toggleMenu={this.toggleMenu}/>
        <Main/>
      </div>
    );
  }
}

export default App;
