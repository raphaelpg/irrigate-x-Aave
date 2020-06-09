import React, { Component } from 'react';
import axios from 'axios'

class Stream extends Component {
	constructor(props){
		super(props);
		this.state = {
      currentStreamAmount: '0',
      setStreamAmount: '',
      userCauses: []
		};
	}

  componentDidMount = () => {
    this.getUserData()
    //this.getUserData() 
    //this/displayData()
  }

  async getUserData() {
    try {
      if (sessionStorage.getItem('userAuth') === 'true') {
        const userEmail = sessionStorage.getItem('userEmail')
        const userToken = sessionStorage.getItem('userToken')

        const payload = new FormData()
        payload.append('email', userEmail)      
        let config = {
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        }

        axios.post('/user/data', payload, config)
          .then((response) => {
            const data = response.data
            console.log(data)
            console.log(data[0])
            console.log(data[0].streamAmount)
            this.setState({
              currentStreamAmount: data[0].streamAmount,
              userCauses: data[0].subscribedCauses
            })
            // this.setState({ userCauses: data })
          })
          .catch(() => {
            console.log('Error retrieving user causes list')
          })
      }
    } catch (e) {
      console.log(e)
    }
  }

  setStreamAmount = (event) => {
    event.preventDefault()
    const payload = new FormData()
    const userEmail = sessionStorage.getItem('userEmail')
    const userToken = sessionStorage.getItem('userToken')
    payload.append('email', userEmail)
    payload.append('newStreamAmount', this.state.setStreamAmount)

    let config = {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    }

    axios.post("/user/updateStreamAmount", payload, config)
      .then(() => {
        console.log('New stream amount sent to the server')
        this.getUserData()
      })
      .catch(() => {
        console.log('Internal server error')
      })
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

	render() {

    console.log(this.state)
		
    let Stream = (
      <div className="Stream">
        <div className="StreamTitle_Close">
          <button className="closeFormAddCauseButton" onClick={this.props.closeStream}>x</button>
          <p className="StreamTitle">Your current stream: {this.state.currentStreamAmount} DAI / month</p>
        </div>
        <div>
          <form className="setStreamForm" onSubmit={this.setStreamAmount} >
            <label>Set monthly donation to: </label>
            <div className="form-input">
              <input 
                name="setStreamAmount" 
                type="number" 
                min="0"
                step="5"
                placeholder="5"
                value={this.state.setStreamAmount} 
                onChange={this.handleChange} 
              /> DAI
            </div>
            <button className="FormAddCauseButton">Set amount</button>
          </form>
        </div>
        <div>List of causes</div>
      </div>
		)

    if (! this.props.displayStream) {
      Stream = null;
    }

    return (
      <div>
        {Stream}
      </div>
    )
	}
}

export default Stream;