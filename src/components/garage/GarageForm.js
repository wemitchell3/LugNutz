import React, { Component } from "react"
import { storage } from "../firebase/firebase"
import "./garage.css"

export default class GarageForm extends Component {
  // Set initial state for the garage component
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
        vehicleMileage: this.state.vehicleMileage,
        vehicleImageURL: this.state.vehicleImageURL
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

  // Create form elements and capture user inputs when submit is clicked
  render() {
    return (
      <React.Fragment>
        <article className="contentContainer">
        <section className="content">
          <form className="vehicleForm">
            <div className="form-group">
              <label htmlFor="modelYear" className="label">Model Year</label>
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
              <label htmlFor="make" className="label">Make</label>
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
              <label htmlFor="model" className="label">Model</label>
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
              <label htmlFor="edition" className="label">Edition</label>
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
              <label htmlFor="engineSize" className="label">Engine Size</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="engineSize"
                placeholder="Engine Size?"
              />
            </div>
            < div className = "form-group" >
              <label htmlFor = "vehicleMileage" className = "label">Current Miles On Vehicle</label> 
              <input
              type = "text"
              required
              className = "form-control"
              onChange = {this.handleFieldChange}
              id = "vehicleMileage"
              placeholder = "Vehicle Mileage?"/>
            </div>
            <div  className="">
            <input type="file" onChange={this.handlePhoto} className="label" id="photolink" />
            <button className="btn btn-primary saveImage" type="button" onClick={() => this.handleUpload()}>Upload</button>
            {this.handleImage()}
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
