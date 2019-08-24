import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'

const Header = (props) => (
  <div style={{border: '1px solid hotpink'}}>
    <i>Header</i>
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
    </ul>
  </div>
)

const Home = (props) => (
  <div>
    This is a home page
  </div>
)

const Admin = (props) => (
  <div>
    This is an admin page
  </div>
)

const Secret = (props) => (
  <div>
    Secret shh
  </div>
)

const Player = (props) => (
  <div>
    Player
    <p>Name: {props.match.params.name}</p>
  </div>
)

  
const Main = (props) => (
  <div style={{border: '1px solid rebeccapurple'}}>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/admin' component={Admin}/>
      <Route path='/secret' component={Secret}/>
      <Route exact path='/player' component={Player}/>
      <Route path='/player/:name' component={Player}/>
    </Switch>
  </div>
)

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
      </div>
    );
  }
}

export default App;
