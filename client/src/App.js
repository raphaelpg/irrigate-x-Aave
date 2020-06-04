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
    logo: null,
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
    payload.append('file', this.state.logo)

    axios.post("/save", payload)
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
      logo: null,
    })
  }

  displayIrrigateCauses = (causes) => {
    if (!causes) return null
    return causes.map( (cause, index) => (
      <div className="causeDisplay" key={index}>
        <img src={cause.logoName} alt={cause.name} />
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
              name="file" 
              type="file"
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