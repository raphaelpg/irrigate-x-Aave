import React, { Component } from 'react';
import axios from 'axios'

class CausesList extends Component {

	state = {
		causes: []
	};

	componentDidMount = () => {
    this.getIrrigateCauses()
  }

  getIrrigateCauses = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data
        this.setState({ causes: data })
        console.log('Causes list received')
      })
      .catch(() => {
        alert('Error retrieving causes list')
      })
  }

  displayIrrigateCauses = (causes) => {
    if (!causes) return null
    return causes.map( (cause, index) => (
      <div className="causeDisplay" key={index}>
        <img className="causeLogo" src={cause.logoName} alt={cause.name} />
        <h3>{cause.name}</h3>
        {/*<p>{cause.category}</p>*/}
        <p>Activity's location: {cause.continent}, {cause.country}</p>
        <p>{cause.description}</p>
        <p>Monthly donors: 2000 persons</p>
        <p>Monthly donations: 1500 DAI</p>
        <p>Total funds raised: 23500 DAI</p>
        {/*<p>{cause.address}</p>*/}
      </div>
    ))
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
          {this.displayIrrigateCauses(this.state.causes)}
        </div>
      </div>
		)
	}
}

export default CausesList;