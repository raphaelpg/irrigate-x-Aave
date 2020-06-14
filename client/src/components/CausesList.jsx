import React, { Component } from 'react'
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
    this.setState({ filter: target.innerHTML})
  }

	render() {
    // console.log("Stream state: ", this.state)
		return (
			<div className="irrigateCausesList">
        <div className="causesListFilterContainer">
          <p className="causesListFilterName" onClick={this.handleCategoryClick} >All</p>
          <p className="causesListFilterName" onClick={this.handleCategoryClick} >Animal Protection</p>
          <p className="causesListFilterName" onClick={this.handleCategoryClick} >Child Protection</p>
          <p className="causesListFilterName" onClick={this.handleCategoryClick} >Development</p>
          <p className="causesListFilterName" onClick={this.handleCategoryClick} >Ecology</p>
          <p className="causesListFilterName" onClick={this.handleCategoryClick} >Education</p>
          <p className="causesListFilterName" onClick={this.handleCategoryClick} >Human Rights</p>
          <p className="causesListFilterName" onClick={this.handleCategoryClick} >Hunger Fight</p>
        </div>
        <div className="causesListContainer">
          {this.displayIrrigateCauses(this.props.causes)}
        </div>
      </div>
		)
	}
}

export default CausesList;