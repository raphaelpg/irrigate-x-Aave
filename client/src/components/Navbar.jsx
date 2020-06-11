import React, { Component } from 'react'
// import axios from 'axios'
import FormAddUser from './FormAddUser'
import FormLogIn from './FormLogIn'
import Stream from './Stream'
import Logout from './Logout'
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
	    displayStream: false,
	    userCausesId: [],
	  }
	}

  componentDidMount = () => {
  	// this.props.checkSessionStorage()
  }

  // checkSessionStorage = async () => {
  //   try {
  //       const sessionUserAuth = await sessionStorage.getItem('userAuth')
  //       const sessionUserToken = await sessionStorage.getItem('userToken')
  //       this.setState({ userAuth: sessionUserAuth, userToken: sessionUserToken })
  //       if (sessionUserAuth === 'true') {
  //         this.setState({ userStatus: 'Connected' })
  //       } else {
  //       	this.setState({ userStatus: '' })
  //       }
  //   } catch (e) {
  //       console.log(e)
  //   }
  // }

  // async getUserData() {
  //   try {
  //     if (sessionStorage.getItem('userAuth') === 'true') {
  //       const userEmail = sessionStorage.getItem('userEmail')
  //       const userToken = sessionStorage.getItem('userToken')

  //       const payload = new FormData()
  //       payload.append('email', userEmail)      
  //       let config = {
  //         headers: {
  //           Authorization: 'Bearer ' + userToken
  //         }
  //       }

  //       axios.post('/user/data', payload, config)
  //         .then((response) => {
  //           const data = response.data
  //           this.setState({
  //             currentStreamAmount: data[0].streamAmount,
  //             userCauses: data[0].subscribedCauses
  //           })
  //           // this.setState({ userCauses: data })
  //         })
  //         .catch(() => {
  //           console.log('Error retrieving user causes list')
  //         })
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

	render() {

		let FormAddUserButton = (
			<div className="NavbarRightCorner">
				<button className="displayFormAddUserButton description" onClick={(e) => this.setState({ displayFormAddUser:true })}>Sign up</button>
				<button className="displayFormLoginUserButton description" onClick={(e) => this.setState({ displayFormLogIn:true })}>Log in</button>
			</div>
		)

		let FormUserConnected = (
			<div className="NavbarRightCorner">
				<button className="displayFormAddUserButton description" onClick={(e) => this.setState({ displayStream:true })}>Manage your stream</button>
				<Logout	checkSessionStorage={ this.checkSessionStorage } />
			</div>
		)

		if (this.state.userStatus === 'Connected') {
      FormAddUserButton = null
    } else {
    	FormUserConnected = null
    }

		return (
			<div className="Navbar">
				<div className="NavbarLeftCorner">
					<img className="NavbarLogo" src={logo} alt="Irrigate logo"></img>
	        <h1 className="Title">IRRIGATE</h1>
        </div>
        <div className="NavbarRightCorner">
        	{FormAddUserButton}
	        {FormUserConnected}

	        <FormAddUser 
	        	displayFormAddUser={ this.state.displayFormAddUser } 
            closeFormAddUser={(e) => this.setState({ displayFormAddUser:false })}
	        />
	        <FormLogIn 
	        	displayFormLogIn={ this.state.displayFormLogIn } 
            closeFormLogIn={(e) => this.setState({ displayFormLogIn:false })}
            checkSessionStorage={ this.props.checkSessionStorage }
            getUserData={ this.props.getUserData }
	        />
	        <Stream
	        	displayStream={ this.state.displayStream } 
            closeStream={(e) => this.setState({ displayStream:false })}
            userCausesId={this.state.userCausesId}
	        />
      	</div>
      </div> 
		)
	}
}

export default Navbar;