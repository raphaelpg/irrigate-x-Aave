import React, { Component } from 'react';
// import axios from 'axios'

class Logout extends Component {
	constructor(props){
		super(props);
		this.state = {

		};
	}

	logoutUser = (event) => {
    event.preventDefault()

    sessionStorage.setItem('userAuth', 'false');
    sessionStorage.removeItem('userToken');
    this.props.checkSessionStorage()
    //remove token from authorization headers 
    //axios post disable token ?
  }

	render() {
		
    return (
      <div className="Logout">
        <button className="LogoutButton" onClick={this.logoutUser}>Logout</button>
      </div>
		)
	}
}

export default Logout;