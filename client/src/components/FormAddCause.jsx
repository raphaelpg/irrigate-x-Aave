import React, { Component } from 'react';
import axios from 'axios'

class FormAddCause extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
	    description: '',
	    category: '',
	    continent: '',
	    country: '',
	    address: '',
	    logo: null,
		};
	}

	handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  handleLogoChange = event => {
    this.setState({
      logo: event.target.files[0]
    })
  }

  submit = (event) => {
    event.preventDefault()
    const payload = new FormData()

    payload.append('name', this.state.name)
    payload.append('description', this.state.description)
    payload.append('category', this.state.category)
    payload.append('continent', this.state.continent)
    payload.append('country', this.state.country)
    payload.append('address', this.state.address)
    payload.append('file', this.state.logo)

    axios.post("/save", payload)
      .then(() => {
        console.log('Data has been sent to the server')
        this.resetUserInputs()
        this.props.getIrrigateCauses()
      })
      .catch(() => {
        console.log('Internal server error')
      })
  }

  resetUserInputs = () => {
    this.setState({
      name: '',
      description: '',
      category: '',
      continent: '',
      country: '',
      address: '',
      logo: null,
    })
  }

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