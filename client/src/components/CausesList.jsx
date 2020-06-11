import React, { Component } from 'react'
// import axios from 'axios'

class CausesList extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

	componentDidMount = () => {
    // this.displayIrrigateCauses()
  }

  displayIrrigateCauses = (causes) => {
    if (!causes) return null
    return causes.map( (cause, index) => (
      <div className="causeDisplay" key={index}>
        <div className="causeLogoContainer">
          <img className="causeLogo" src={cause.logoName} alt={cause.name} />
        </div>
        <h3>{cause.name}</h3>
        <p>{cause.category}</p>
        <p>Activity's location: {cause.continent}, {cause.country}</p>
        <p>{cause.description}</p>
        {/*<a href="/localhost:8080">Website</a>*/}
        <p className="causeNumber">Monthly donors: 2000 persons</p>
        <p className="causeNumber">Monthly donations: 1500 DAI</p>
        <p className="causeNumber">Total funds raised: 23500 DAI</p>
        <button name={cause._id} onClick={this.props.addCauseToUserList} >Add cause to your donation stream</button>
        {/*<p>{cause.address}</p>*/}
      </div>
    ))
  }

  // addCauseToUserList = ({ target }) => {
  //   console.log(target.name)
  // }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

	render() {
		return (
			<div className="irrigateCausesList">
        <div className="causesListFilterContainer">
          <p className="causesListFilterName">All</p>
          <p className="causesListFilterName">Animal Protection</p>
          <p className="causesListFilterName">Child Protection</p>
          <p className="causesListFilterName">Disease Fight</p>
          <p className="causesListFilterName">Ecology</p>
          <p className="causesListFilterName">Education</p>
          <p className="causesListFilterName">Human Rights</p>
          <p className="causesListFilterName">Hunger Fight</p>
        </div>
        <div className="causesListContainer">
          {this.displayIrrigateCauses(this.props.causes)}
        </div>
      </div>
		)
	}
}

export default CausesList;