import React, { Component } from "react"
import "./garage.css"

export default class GarageForm extends Component {
  // Set initial state for the garage component
  state = {
    userId: "",
    modelYear: "",
    make: "",
    model: "",
    edition: "",
    engineSize: ""
  }

  // Local method for input validation, creating a garage object, and
  // invoking the function reference passed from parent component

  constructNewVehicle = event => {
    event.preventDefault()
    if (this.state.garage === "") {
      window.alert("Please enter a Vehicle")
    } else {
      const vehicle = {
        userId: Number(sessionStorage.getItem("userId")),
        modelYear: this.state.modelYear,
        make: this.state.make,
        model: this.state.model,
        edition: this.state.edition,
        engineSize: this.state.engineSize,
      }
      // Create the vehicle and redirect user to the vehicle list
      this.props.addVehicle(vehicle)
      .then(() => 
      this.props.history.push("/garage")
      )
    }
  }
  
  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  // Create form elements and capture user inputs when submit is clicked
  render() {
    return (
      <React.Fragment>
        <article className="contentContainer">
        <section className="content">
          <form className="vehicleForm">
            <div className="form-group">
              <label htmlFor="modelYear">Model Year</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="modelYear"
                placeholder="Model Year?"
              />
            </div>
            <div className="form-group">
              <label htmlFor="make">Make</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="make"
                placeholder="Make?"
              />
            </div>
            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="model"
                placeholder="Model?"
              />
            </div>
            <div className="form-group">
              <label htmlFor="edition">Edition</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="edition"
                placeholder="Edition?"
              />
            </div>
            <div className="form-group">
              <label htmlFor="engineSize">Engine Size</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="engineSize"
                placeholder="Enigine Size?"
              />
            </div>
            <button
              type="submit"
              onClick={this.constructNewVehicle}
              className="btn btn-primary"
            >
              Submit
            </button>
            <button
                type="submit"
                onClick={() => this.props.history.push("/garage")}
                className="btn btn-primary"
              >
                Cancel
              </button>
          </form>
        </section>
        </article>
      </React.Fragment>
    )
  }
}
