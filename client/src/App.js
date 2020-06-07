import React from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import HomeDescription from './components/HomeDescription'
import FormAddCause from './components/FormAddCause'
import CausesList from './components/CausesList'
import FormAddUser from './components/FormAddUser'
import Footer from './components/Footer'
import './App.scss'

class App extends React.Component {

  state = {
    displayFormAddCause: false
  }

  render() {

    // console.log('State: ', this.state)

    return(
      <div className="app">
        <Navbar />
        <div className="HomeDescription_FormAddCause">
          <HomeDescription />
          <button className="displayFormAddCauseButton" onClick={(e) => this.setState({ displayFormAddCause:true })}>Register your cause</button>
          <FormAddCause 
            displayFormAddCause={ this.state.displayFormAddCause } 
            closeFormAddCause={(e) => this.setState({ displayFormAddCause:false })}
          />
        </div>
        <CausesList />
        {/*<FormAddUser />*/}
        <Footer />
      </div>
    )
  }
}


export default App