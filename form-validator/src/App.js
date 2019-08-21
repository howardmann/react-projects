import React, { Component } from 'react';
import validateForm from './util/validateForm/validateForm'
import {listUsers} from './util/airtable'

const Form = ({company, email, password, handleInputChange, handleSubmit}) => (
  <form onSubmit={handleSubmit}>
    <input type="text" name='company' value={company} placeholder="company name" onChange={handleInputChange}/>
    <input type="text" name='email' value={email} placeholder="email" onChange={handleInputChange}/>
    <input type="password" name='password' value={password} placeholder="password" onChange={handleInputChange}/>
    <input type="submit"/>
  </form>
)

const Success = ({success, company}) => (
  <p style={{backgroundColor: 'green'}}>
    {success && <p>Success: {company}</p>}
  </p>
)

const Error = ({error}) => (
  <ul style={{backgroundColor: 'red'}}>
    {error && error.map(err => (
      <li>{err}</li>
    ))}
  </ul>
)

const Users = ({users}) => (
  <div>
    {users.map(user => (
      <ul>
        <li>{user.company}</li>
        <li>{user.email}</li>
        <li>{user.password}</li>
      </ul>
    ))}
  </div>
)

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      company: '',
      email: '',
      password: '',
      error: null,
      success: false,
      users: []
    }
  }
  fetchServer = () => {
    listUsers().then(users => {
      this.setState({users})
    })
  }
  componentDidMount = () => {
    // Poll server every 3 seconds
    this.fetchServer();
    let syncTimer = setInterval(() => {
      console.log('Poll server');
      this.fetchServer();
    }, 3000)
    this.setState({syncTimer})
  }
  componentWillUnmount = () => {
    // Clear timer
    clearInterval(this.state.syncTimer)
  }
  handleInputChange = (e) => {
    e.preventDefault()
    let {name, value} = e.target
    this.setState({
      [name]: value
    })    
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let validate = validateForm({company: this.state.company, email: this.state.email, password: this.state.password})
    if (validate === true) {
      return this.setState({
        error: null,
        success: true
      })
    }
    this.setState({
      success: false,
      error: validate
    })
  }
  render() {
    return (
      <div>
        <h1>Form Validator</h1>
        <Error error={this.state.error}/>
        <Success success={this.state.success} company={this.state.company}/>
        <Form company={this.state.company} email={this.state.email} password={this.state.password} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit}/>
        <Users users={this.state.users}/>
      </div>
    );
  }
}

export default App;
