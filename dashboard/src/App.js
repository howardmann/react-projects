import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import TodoApp from './TodoApp/App'

const SideBar = (props) => (
  <div id="sidebar-wrapper" className="bg-stone">
    <ul id="sidebar-list" className="list-reset pl-10">
      <li>
        <NavLink exact to="/" activeStyle={{backgroundColor: 'red'}}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/admin" activeStyle={{backgroundColor: 'blue'}}>Admin</NavLink>
      </li>
      <li>
        <NavLink to="/secret">Secret</NavLink>
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
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, vel rem tempora itaque, odit tempore fugiat autem et ullam consequatur aut quas iure voluptatum aliquam vitae non unde alias quisquam.</p>
    </div>
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam delectus dolorem illum, iste, quae modi soluta repudiandae porro velit odio fugiat deserunt hic facere laboriosam eius impedit repellat repellendus numquam ipsam quos nulla sequi! Sunt magnam tenetur perspiciatis nulla reprehenderit tempore minus esse quia, distinctio quasi sequi architecto quos magni adipisci provident dolorum ut ipsam. Provident obcaecati vitae magni ducimus optio soluta repudiandae blanditiis ut! Atque voluptas quam et eaque aliquam, labore facere sed nemo quis aliquid mollitia! Tempore, modi facilis tenetur perspiciatis sequi repellat porro cumque non impedit suscipit rem deleniti ea ipsum magnam quasi nihil natus at recusandae.</p>
    </div>    
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

const Header = (props) => (
  <div className="row p-15 bg-gray white bold">
    <div className="col-4">
      <span className="fs-18">DashBoard</span>
      <span style={{cursor: 'pointer', padding: '0px 10px'}} onClick={props.toggleMenu}>
          &#9776;
      </span>
    </div>
    <div className="col-8 right-align">
      <a href="/">Home</a>
    </div>
  </div>
)
const Main = (props) => (
  <div id="page-content-wrapper" className="border border-2 border-blue">
    <button onClick={props.toggleMenu}>Toggle Menu</button>
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
    let activeClass = this.state.showMenu ? 'toggled' : null
    return (
      <div>
        <Header toggleMenu={this.toggleMenu}/>
        <div id="wrapper" className={`${activeClass} row flex`}>        
          <SideBar toggleMenu={this.toggleMenu}/>        
          <Main toggleMenu={this.toggleMenu}/>
        </div>
      </div>
    );
  }
}

export default App;
