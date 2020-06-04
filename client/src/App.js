import React from 'react'
import axios from 'axios'
import './App.css'

class App extends React.Component {

  state = {
    name: '',
    description: '',
    category: '',
    continent: '',
    country: '',
    logoName: null,
    causes: []
  }

  componentDidMount = () => {
    this.getIrrigateCauses()
  }

  getIrrigateCauses = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data
        this.setState({ causes: data })
        console.log('Data has been received')
      })
      .catch(() => {
        alert('Error retrieving data')
      })
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  handleLogoChange(e) {
    this.setState({ logoName: e.target.files[0] })
  }

  submit = (event) => {
    event.preventDefault()
    const payload = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      continent: this.state.continent,
      country: this.state.country,
    }

    payload.append('logoName', this.state.logoName)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    axios({
      url: '/save',
      method: 'POST',
      data: payload,
      config
    })
      .then(() => {
        console.log('Data has been sent to the server')
        this.resetUserInputs()
        this.getIrrigateCauses()
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
    })
  }

  displayIrrigateCauses = (causes) => {
    if (!causes) return null
  
    return causes.map( (cause, index) => (
      <div className="causeDisplay" key={index}>
        <img src={1} alt={cause.name} />
        <h3>{cause.name}</h3>
        <p>{cause.category}</p>
        <p>{cause.continent}</p>
        <p>{cause.country}</p>
        <p>{cause.description}</p>
      </div>
    ))
  }

  render() {

    // console.log('State: ', this.state)

    return(
      <div className="app">
        <h2>Welcome to my App</h2>
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
          <label>Logo file name</label>
          <div className="form-input">
            <input
              name="logoName" 
              type="file" 
              value={this.state.logoName} 
              onChange={this.handleLogoChange} 
            />
          </div>
          <button>Submit</button>
        </form>

        <div className="irrigateCausesList">
          {this.displayIrrigateCauses(this.state.causes)}
        </div>
      </div>
    )
  }
}


export default App