import React, { Component } from 'react';
import axios from 'axios'
import getWeb3 from '../utils/getWeb3';

class Stream extends Component {
	constructor(props){
		super(props);
		this.state = {
      newStreamAmount: '',
      donateOnceAmount: '5'
		};
	}

  componentDidMount = () => {
    
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
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

  setStreamAmount = (event) => {
    event.preventDefault()
    const payload = new FormData()
    const userEmail = sessionStorage.getItem('userEmail')
    const userToken = sessionStorage.getItem('userToken')
    payload.append('email', userEmail)
    payload.append('newStreamAmount', this.state.newStreamAmount)
    // payload.append('newStreamAmount', this.state.setStreamAmount)

    let config = {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    }

    axios.post("/user/updateStreamAmount", payload, config)
      .then(() => {
        console.log('New stream amount sent to the server')
        this.props.getUserData()
      })
      .catch(() => {
        console.log('Internal server error')
      })
  }

  donateOnce = async (event) => {
    event.preventDefault()
    const web3 = await getWeb3();
    const { irrigateAddress, accounts, mockDaiContract } = this.props
    const getBalance = await mockDaiContract.methods.balanceOf(accounts[0]).call()
    const userBalance = parseInt(getBalance)
    const userDonation = web3.utils.toWei(this.state.donateOnceAmount, "ether").toString()
    // const daiAmountinWei = web3.utils.toWei("1000", "ether").toString()
    console.log(userBalance)
    console.log(typeof(userBalance))
    console.log(userDonation)
    console.log(typeof(userDonation))
    if (userBalance >= userDonation) {
      console.log("ok to transfer")
      await mockDaiContract.methods.transfer(irrigateAddress, userDonation).send({from: accounts[0]})
      .then(() => {
        const payload = new FormData()
        payload.append('amount', userDonation)
        payload.append('causeAddress', '0x9730566588BFb9d3b8A8d6e0630F1e629399CB39')
        
        axios.post("/donations/donateOnce", payload)
          .then(() => {
            console.log('Donation sent')
            // this.props.getUserData()
          })
          .catch(() => {
            console.log('Internal server error')
          })
      })
      //inform server that user X have sent amount Y to causes 1, 2 , 3 ...
      // const userEmail = sessionStorage.getItem('userEmail')
      // const userToken = sessionStorage.getItem('userToken')
      // payload.append('gavedAmount', this.state.donateOnceAmount)

      // let config = {
      //   headers: {
      //     Authorization: 'Bearer ' + userToken
      //   }
      // }

    } else alert("Unsufficient DAI balance")
  }

	render() {

    // console.log("Stream state: ", this.state)
		
    let Stream = (
      <div className="Stream">
        <div className="StreamTitle_Close">
          <p className="StreamTitle">Your current stream:</p>
          <button className="closeFormAddCauseButton" onClick={this.props.closeStream}>x</button>
        </div>
        <div>Your supported causes:</div>
        <div className="userCausesContainer">
          {this.displayUserCauses(this.props.userCauses)}
        </div>

        <div className="donateOnceContainer">
          <form className="donateOnceForm" onSubmit={this.donateOnce} >
            <label>Donation value: </label>
            <div className="form-input">
              <input 
                name="donateOnceAmount" 
                type="number" 
                min="1"
                step="5"
                placeholder="0"
                onChange={this.handleChange} 
              /> DAI
            </div>
            <button className="FormAddCauseButton">Donate once</button>
          </form>
        </div>

        <div>
          <p className="">Your current stream: {this.props.currentStreamAmount} DAI / month</p>
          <form className="setStreamForm" onSubmit={this.setStreamAmount} >
            <label>Set monthly donation to: </label>
            <div className="form-input">
              <input 
                name="newStreamAmount" 
                type="number" 
                min="0"
                step="5"
                placeholder="5"
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