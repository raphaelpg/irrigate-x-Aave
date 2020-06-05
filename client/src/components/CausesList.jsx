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
        <p>{cause.category}</p>
        <p>{cause.continent}</p>
        <p>{cause.country}</p>
        <p>{cause.description}</p>
        <p>{cause.address}</p>
      </div>
    ))
  }

	render() {
		return (
			<div className="irrigateCausesList">
        {this.displayIrrigateCauses(this.state.causes)}
      </div>
		)
	}
}

export default CausesList;