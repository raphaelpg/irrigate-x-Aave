import React, { Component } from 'react'
import FormAddUser from './FormAddUser'
import FormLogIn from './FormLogIn'
const logo = require('./planet.png')

class Navbar extends Component {
	constructor(props){
		super(props)
		this.state = {
			userAuth: false,
	    userToken: '',
	    userStatus: '',
	    displayFormAddUser: false,
	    displayFormLogIn: false,
	  }
	}

  componentDidMount = () => {
  	this.checkSessionStorage()
  }

  checkSessionStorage = async () => {
    try {
        const sessionUserAuth = await sessionStorage.getItem('userAuth')
        const sessionUserToken = await sessionStorage.getItem('userToken')
        this.setState({ userAuth: sessionUserAuth, userToken: sessionUserToken })
        if (sessionUserAuth === 'true') {
          this.setState({ userStatus: 'Connected' })
        }
    } catch (e) {
        console.log(e)
    }
  }


	render() {
		console.log(this.state)

		let FormAddUserButton = (
			<div className="NavbarRightCorner">
				<button className="displayFormAddUserButton description" onClick={(e) => this.setState({ displayFormAddUser:true })}>Sign up</button>
				<button className="displayFormLoginUserButton description" onClick={(e) => this.setState({ displayFormLogIn:true })}>Log in</button>
			</div>
		)

		if (this.state.userStatus === 'Connected') {
      FormAddUserButton = null
    }

		return (
			<div className="Navbar">
				<div className="NavbarLeftCorner">
					<img className="NavbarLogo" src={logo} alt="Irrigate logo"></img>
	        <h1 className="Title">IRRIGATE</h1>
        </div>
        <div className="NavbarRightCorner">
        	{FormAddUserButton}
	        <FormAddUser 
	        	displayFormAddUser={ this.state.displayFormAddUser } 
            closeFormAddUser={(e) => this.setState({ displayFormAddUser:false })}
	        />
	        <FormLogIn 
	        	displayFormLogIn={ this.state.displayFormLogIn } 
            closeFormLogIn={(e) => this.setState({ displayFormLogIn:false })}
            checkSessionStorage={ this.checkSessionStorage }
	        />
      	</div>
      </div> 
		)
	}
}

export default Navbar;