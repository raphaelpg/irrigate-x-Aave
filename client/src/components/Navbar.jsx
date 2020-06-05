import React, { Component } from 'react';

class Navbar extends Component {

	render() {
		return (
			<div className="Navbar">
				<div className="NavbarLeftCorner">
					<img alt="Irrigate logo"></img>
	        <h1 className="Title">Irrigate</h1>
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