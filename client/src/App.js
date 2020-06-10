import React from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import HomeDescription from './components/HomeDescription'
import FormAddCause from './components/FormAddCause'
import CausesList from './components/CausesList'
import Footer from './components/Footer'
import './css/App.scss'

class App extends React.Component {

  state = {
    causes: [],
    displayFormAddCause: false
  }

  componentDidMount() {
    this.getIrrigateCauses()
  }

  async getIrrigateCauses() {
    try {
      axios.get('/api')
        .then((response) => {
          const data = response.data
          this.setState({ causes: data })
        })
        .catch(() => {
          console.log('Error retrieving causes list')
        })
    } catch (e) {
      console.log(e)
    }
  }

  render() {

    // console.log('State: ', this.state)

    return(
      <div className="app">
        <Navbar
          userStatus={ this.state.userStatus }
          checkSessionStorage={ this.checkSessionStorage }
        />
        <div className="HomeDescription_FormAddCause">
          <HomeDescription />
          <button className="displayFormAddCauseButton" onClick={(e) => this.setState({ displayFormAddCause:true })}>Register your cause</button>
          <FormAddCause 
            getIrrigateCauses={ this.getIrrigateCauses }
            displayFormAddCause={ this.state.displayFormAddCause } 
            closeFormAddCause={(e) => this.setState({ displayFormAddCause:false })}
          />
        </div>
        <CausesList
          causes={ this.state.causes }
        />
        <Footer />
      </div>
    )
  }
}


export default App