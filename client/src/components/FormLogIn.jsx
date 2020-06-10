import React, { Component } from 'react';
import axios from 'axios'

class FormLogIn extends Component {
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

	logUser = (event) => {
    event.preventDefault()
    const payload = new FormData()

    payload.append('email', this.state.email)
    payload.append('password', this.state.password)

    axios.post("/user/login", payload)
      .then((res) => {
        sessionStorage.setItem('userEmail', this.state.email)
        sessionStorage.setItem('userAuth', 'true');
        sessionStorage.setItem('userToken', res.data.token);
        this.resetSignupInputs()
        this.props.checkSessionStorage()
        this.props.getUserData()
      })
      .catch((error) => {
        console.log(error)
      }
    )
  }

  resetSignupInputs = () => {
    this.setState({
      email: '',
      password: '',
    })
  }

	render() {
		
    let FormLogIn = (
      <div className="FormAddUser">
        <div className="FormAddUserTitle_Close">
          <p className="FormAddUserTitle">Login: </p>
          <button className="closeFormAddUserButton" onClick={this.props.closeFormLogIn}>x</button>
  			</div>
        <form onSubmit={this.logUser} >
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
              type="password" 
              value={this.state.password} 
              onChange={this.handleChange} 
            />
          </div>
          <button className="FormAddCauseButton">Login</button>
        </form>
      </div>
		)

    if (! this.props.displayFormLogIn) {
      FormLogIn = null;
    }

    return (
      <div>
        {FormLogIn}
      </div>
    )
	}
}

export default FormLogIn;