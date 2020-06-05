import React, { Component } from 'react';
import axios from 'axios'

class FormAddUser extends Component {

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

	submitUser = (event) => {
    event.preventDefault()
    const payload = new FormData()

    payload.append('email', this.state.email)
    payload.append('password', this.state.password)

    axios.post("/user/signup", payload)
      .then(() => {
        console.log('Data has been sent to the server')
        this.resetSignupInputs()
      })
      .catch(() => {
        console.log('Internal server error')
      })
  }

  resetSignupInputs = () => {
    this.setState({
      email: '',
      password: '',
    })
  }

	render() {
		return (
			<form onSubmit={this.submitUser} >
        <label>Email</label>
        <div className="form-input">
          <input 
            name="email" 
            type="text" 
            value={this.state.email} 
            onChange={this.handleChange} 
          />
        </div>
        <label>Password</label>
        <div className="form-input">
          <input 
            name="password" 
            type="text" 
            value={this.state.password} 
            onChange={this.handleChange} 
          />
        </div>
        <button>Sign up</button>
      </form>
		)
	}
}

export default FormAddUser;