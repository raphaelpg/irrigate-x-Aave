import React from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import FormAddCause from './components/FormAddCause'
import './App.css'

class App extends React.Component {

  state = {
    name: '',
    description: '',
    category: '',
    continent: '',
    country: '',
    address: '',
    logo: null,
    causes: [],
    email: '',
    password: ''
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

  submitUser = (event) => {
    event.preventDefault()
    const payload = new FormData()

    payload.append('email', this.state.email)
    payload.append('password', this.state.password)

    axios.post("/user/signup", payload)
      .then(() => {
        console.log('Data has been sent to the server')
        this.resetSignupInputs()
      })
      .catch(() => {
        console.log('Internal server error')
      })
  }

  resetSignupInputs = () => {
    this.setState({
      email: '',
      password: '',
    })
  }

  displayIrrigateCauses = (causes) => {
    if (!causes) return null
    return causes.map( (cause, index) => (
      <div className="causeDisplay" key={index}>
        <img className="causeLogo" src={cause.logoName} alt={cause.name} />
        <h3>{cause.name}</h3>
        <p>{cause.category}</p>
        <p>{cause.continent}</p>
        <p>{cause.country}</p>
        <p>{cause.description}</p>
        <p>{cause.address}</p>
      </div>
    ))
  }

  render() {

    // console.log('State: ', this.state)

    return(
      <div className="app">
        <Navbar />
        {/*<FormAddCause 
          getIrrigateCauses = {this.getIrrigateCauses}
        />
*/}
        <div className="irrigateCausesList">
          {this.displayIrrigateCauses(this.state.causes)}
        </div>

        <form onSubmit={this.submitUser} >
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
              type="text" 
              value={this.state.password} 
              onChange={this.handleChange} 
            />
          </div>
          <button>Sign up</button>
        </form>
      </div>
    )
  }
}


export default App