import React, { Component } from "react"
import GarageManager from "./GarageManager"

export default class GarageEditForm extends Component {
  state = {
    modelYear: "",
    make: "",
    model: "",
    edition: "",
    engineSize: "",
    userId: ""
  }

  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  updateExistingVehicle = event => {
    event.preventDefault()

    const vehicle = {
      id: Number(this.props.match.params.vehicleId),
      modelYear: this.state.modelYear,
      make: this.state.make,
      model: this.state.model,
      edition: this.state.edition,
      engineSize: this.state.engineSize,
      userId: Number(sessionStorage.getItem("userId"))
    }
    this.props
      .updateVehicle(vehicle)
      .then(() => this.props.history.push("/garage"))
    this.props.userSpecificData()
  }

  componentDidMount() {
    GarageManager.get(this.props.match.params.vehicleId).then(vehicle => {
      this.setState({
        modelYear: vehicle.modelYear,
        make: vehicle.make,
        model: vehicle.model,
        edition: vehicle.edition,
        engineSize: vehicle.engineSize
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        <article className="contentContainer">
        <form className="card">
          <div className="form-group">
            <label htmlFor="modelYear"> Model Year: </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="modelYear"
              value={this.state.modelYear}
            />
            <label htmlFor="make"> Make: </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="make"
              value={this.state.make}
            />
            <label htmlFor="model"> Model: </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="model"
              value={this.state.model}
            />
            <label htmlFor="edition"> Edition: </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="edition"
              value={this.state.edition}
            />
            <label htmlFor="engineSize"> Engine Size: </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="engineSize"
              value={this.state.engineSize}
            />
            <button
              type="submit"
              onClick={this.updateExistingVehicle}
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
          </div>
        </form>
        </article>
      </React.Fragment>
    )
  }
}