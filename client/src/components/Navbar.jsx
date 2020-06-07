import React, { Component } from 'react';
const logo = require('./planet.png');

class Navbar extends Component {

	render() {
		return (
			<div className="Navbar">
				<div className="NavbarLeftCorner">
					<img className="NavbarLogo" src={logo} alt="Irrigate logo"></img>
	        <h1 className="Title">IRRIGATE</h1>
        </div>
        <div className="NavbarRightCorner">
	        <button className="description">Sign up</button>
	        <button className="description">Login</button>
      	</div>
      </div> 
		)
	}
}

export default Navbar;