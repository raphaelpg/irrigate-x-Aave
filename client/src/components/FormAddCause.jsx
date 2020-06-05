import React, { Component } from 'react';

class FormAddCause extends Component {

	render() {
		return (
			<div className="FormAddCause">
				<form onSubmit={this.submit} >
          <label>Name</label>
          <div className="form-input">
            <input 
              name="name" 
              type="text" 
              value={this.state.name} 
              onChange={this.handleChange} 
            />
          </div>
          <label>Description</label>
          <div className="form-input">
            <textarea 
              name="description" 
              cols="30" 
              rows="10" 
              value={this.state.description} 
              onChange={this.handleChange} 
            >
            </textarea>
          </div>
          <label>Category</label>
          <div className="form-input">
            <input 
              name="category" 
              type="text" 
              value={this.state.category} 
              onChange={this.handleChange} 
            />
          </div>
          <label>Continent</label>
          <div className="form-input">
            <input 
              name="continent" 
              type="text" 
              value={this.state.continent} 
              onChange={this.handleChange} 
            />
          </div>
          <label>Country</label>
          <div className="form-input">
            <input
              name="country" 
              type="text" 
              value={this.state.country} 
              onChange={this.handleChange} 
            />
          </div>
          <label>Ethereum address</label>
          <div className="form-input">
            <input
              name="address" 
              type="text" 
              value={this.state.address} 
              onChange={this.handleChange} 
            />
          </div>
          <label>Logo file name</label>
          <div className="form-input">
            <input
              name="file" 
              type="file"
              onChange={this.handleLogoChange} 
            />
          </div>
          <button>Submit</button>
        </form>
      </div> 
		)
	}
}

export default FormAddCause;