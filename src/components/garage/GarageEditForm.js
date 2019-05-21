import React, { Component } from "react"
import { storage } from "../firebase/firebase"
import GarageManager from "./GarageManager"

export default class GarageEditForm extends Component {
  state = {
    userId: "",
    modelYear: "",
    make: "",
    model: "",
    edition: "",
    engineSize: "",
    vehicleMileage: "",
    vehicleImageURL: ""
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
      vehicleMileage: this.state.vehicleMileage,
      vehicleImageURL: this.state.vehicleImageURL,
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
        engineSize: vehicle.engineSize,
        vehicleMileage: vehicle.vehicleMileage,
        vehicleImageURL: vehicle.vehicleImageURL
      })
    })
  }

  handlePhoto = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0]
      this.setState({
      photoLink: image
    })
    }
  }

  handleUpload = () => {
    const image = this.state.photoLink
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on("state_changed",
    (snapshot) => {
      console.log(snapshot)
      this.setState({
        loadMin: snapshot.bytesTransferred,
        loadMax: snapshot.totalBytes
      })
    },
    (error) => {
  
    },
    () => {
      storage.ref('images').child(image.name).getDownloadURL().then(vehicleImageURL => {
        this.setState({ vehicleImageURL })
      })
    })
  } 

  handleImage = () => {
    if (this.state.vehicleImageURL !== "") {
      return <img className="img-fluid vehicleImage" src={this.state.vehicleImageURL} alt="Vehicle" />
    }
  }

  render() {
    return (
      <React.Fragment>
        <article className="contentContainer">
        {/* <form className="card"> */}
          <div className="form-group">
            <label htmlFor="modelYear" className="label">Model Year: </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="modelYear"
              value={this.state.modelYear}
            />
            <label htmlFor="make" className="label">Make: </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="make"
              value={this.state.make}
            />
            <label htmlFor="model" className="label">Model: </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="model"
              value={this.state.model}
            />
            <label htmlFor="edition" className="label">Edition: </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="edition"
              value={this.state.edition}
            />
            <label htmlFor="engineSize" className="label">Engine Size: </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="engineSize"
              value={this.state.engineSize}
            />
            <label htmlFor="vehicleMileage" className="label">Current Mileage: </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="vehicleMileage"
              value={this.state.vehicleMileage}
            />
            <div >
            <input 
            type="file" 
            onChange={this.handlePhoto} 
            className="label"                 
            id="photolink" />
            <button className="btn btn-primary saveImage" type="button" onClick={() => this.handleUpload()}>Upload</button>
            </div>
            {this.handleImage()}
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
        {/* </form> */}
        </article>
      </React.Fragment>
    )
  }
}