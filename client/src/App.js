import React from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import FormAddCause from './components/FormAddCause'
import CausesList from './components/CausesList'
import FormAddUser from './components/FormAddUser'
import './App.css'

class App extends React.Component {

  state = {

  }

  render() {

    // console.log('State: ', this.state)

    return(
      <div className="app">
        <Navbar />
        <CausesList />
        <FormAddUser />
      </div>
    )
  }
}


export default App