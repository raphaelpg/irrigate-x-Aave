import React, { Component } from 'react';
import axios from 'axios'

class Stream extends Component {
	constructor(props){
		super(props);
		this.state = {
      currentStreamAmount: '0',
      setStreamAmount: '',
      userCausesId: [],
      userCauses: []
		};
	}

  componentDidMount = () => {
    this.getUserData()
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
              userCausesId: data[0].subscribedCauses
            })
            this.getUserCauses()
            // this.setState({ userCauses: data })
          })
          .catch((e) => {
            console.log('Error retrieving user data')
            console.log(e)
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

  async getUserCauses() {
    try {
      const payload = new FormData()
      const userToken = sessionStorage.getItem('userToken')
      payload.append('causesId', this.state.userCausesId)

      let config = {
        headers: {
          Authorization: 'Bearer ' + userToken
        }
      }

      axios.post('/user/causes', payload, config)
        .then((response) => {
          console.log(response.data)
          const data = response.data
          this.setState({ userCauses: data })
        })
        .catch((e) => {
          console.log(e)
          console.log('Error retrieving causes list')
        })
    } catch (e) {
      console.log(e)
    }
  }

  displayUserCauses = (userCauses) => {
    if (!userCauses) return null
    return userCauses.map( (cause, index) => (
      <div className="causeDisplay" key={index}>
        <div className="causeLogoContainer">
          <img className="causeLogo" src={cause.logoName} alt={cause.name} />
        </div>
        <h3>{cause.name}</h3>
        <p>{cause.category}</p>
      </div>
    ))
  }

	render() {

    console.log(this.state)
		
    let Stream = (
      <div className="Stream">
        <div className="StreamTitle_Close">
          <p className="StreamTitle">Your current stream:</p>
          <button className="closeFormAddCauseButton" onClick={this.props.closeStream}>x</button>
        </div>
        <div>Your supported causes:</div>
        <div className="userCausesContainer">
          {this.displayUserCauses(this.state.userCauses)}
        </div>
        <div>
          <p className="">Your current stream: {this.state.currentStreamAmount} DAI / month</p>
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