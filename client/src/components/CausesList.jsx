import React, { Component } from 'react'
const animal = require('./animal.png')
const development = require('./development.png')
const education = require('./education.png')
const environment = require('./environment.png')
const health = require('./health.png')
const human_rights = require('./human_rights.png')
// import axios from 'axios'

class CausesList extends Component {
  constructor(props){
    super(props);
    this.state = {
      filter: 'All'
    };
  // this.displayIrrigateCauses = this.displayIrrigateCauses.bind(this)
  }

	componentDidMount = () => {
    // this.displayIrrigateCauses()
  }

  displayIrrigateCauses = (causes) => {
    if (!causes) return null
    if (this.state.filter === 'All') {
      return causes.map( (cause, index) => (
        <div className="causeDisplay" key={index}>
          <div className="causeLogoContainer">
            <img className="causeLogo" src={cause.logoName} alt={cause.name} />
          </div>
          <h3>{cause.name}</h3>
          <p>{cause.category}</p>
          <p>Activity's location: {cause.continent}, {cause.country}</p>
          <p>{cause.description}</p>
          <a href={cause.link} target="_blank" rel="noopener noreferrer">{cause.link}</a>
          <p className="causeNumber">Monthly donors: 2000 persons</p>
          <p className="causeNumber">Monthly donations: 1500 DAI</p>
          <p className="causeNumber">Total funds raised: 23500 DAI</p>
          <button className="addCauseToYourListButton" name={cause._id} onClick={this.props.addCauseToUserList} >Add cause to your donation stream</button>
          {/*<p>{cause.address}</p>*/}
        </div>
      ))
    }
    else {
      let result = causes.filter(cause => {
        return cause.category === this.state.filter
      })  
      return result.map( (cause, index) => (
        <div className="causeDisplay" key={index}>
          <div className="causeLogoContainer">
            <img className="causeLogo" src={cause.logoName} alt={cause.name} />
          </div>
          <h3>{cause.name}</h3>
          <p>{cause.category}</p>
          <p>Activity's location: {cause.continent}, {cause.country}</p>
          <p>{cause.description}</p>
          <a href={cause.link} target="_blank" rel="noopener noreferrer">{cause.link}</a>
          <p className="causeNumber">Monthly donors: 2000 persons</p>
          <p className="causeNumber">Monthly donations: 1500 DAI</p>
          <p className="causeNumber">Total funds raised: 23500 DAI</p>
          <button className="addCauseToYourListButton" name={cause._id} onClick={this.props.addCauseToUserList} >Add cause to your donation stream</button>
          {/*<p>{cause.address}</p>*/}
        </div>
      ))  
    }
  }

  

  // addCauseToUserList = ({ target }) => {
  //   console.log(target.name)
  // }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  handleCategoryClick = ({ target }) => {
    if (target.innerHTML) {
      this.setState({ filter: target.innerHTML})
    } else {
      this.setState({ filter: target.name})
    }
  }

	render() {
    // console.log("Stream state: ", this.state)
		return (
			<div className="irrigateCausesList">
        <div className="causesListFilterContainer">
          <div className="filterAndLogoContainer">
            <p className="causesListFilterName" onClick={this.handleCategoryClick} >All</p>
          </div>
          <div className="filterAndLogoContainer"  onClick={this.handleCategoryClick} >
            <img className="causeFilterLogo" name="Animal Protection" src={animal} alt="animal logo"></img>
            <p className="causesListFilterName" >Animal Protection</p>
          </div>
          <div className="filterAndLogoContainer" onClick={this.handleCategoryClick} >
            <img className="causeFilterLogo" name="Health" src={health} alt="health logo"></img>
            <p className="causesListFilterName" >Health</p>
          </div>
          <div className="filterAndLogoContainer" onClick={this.handleCategoryClick} >
            <img className="causeFilterLogo" name="Development" src={development} alt="development logo"></img>
            <p className="causesListFilterName" >Development</p>
          </div>
          <div className="filterAndLogoContainer" onClick={this.handleCategoryClick} >
            <img className="causeFilterLogo" name="Environment" src={environment} alt="environment logo"></img>
            <p className="causesListFilterName" >Environment</p>
          </div>
          <div className="filterAndLogoContainer" onClick={this.handleCategoryClick} >
            <img className="causeFilterLogo" name="Education" src={education} alt="education logo"></img>
            <p className="causesListFilterName" >Education</p>
          </div>
          <div className="filterAndLogoContainer" onClick={this.handleCategoryClick} >
            <img className="causeFilterLogo" name="Human Rights" src={human_rights} alt="human_rights logo"></img>
            <p className="causesListFilterName" >Human Rights</p>
          </div>
        </div>
        <div className="causesListContainer">
          {this.displayIrrigateCauses(this.props.causes)}
        </div>
      </div>
		)
	}
}

export default CausesList;