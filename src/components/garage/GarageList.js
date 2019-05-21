import React, { Component } from "react"

export default class GarageList extends Component {

  render() {
    return (
      <React.Fragment>
        <article className="contentContainer">
        <h1 className="title"> My Vehicles </h1>
        <section>     
        <section>
          <div className="taskButton">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                this.props.history.push("/garage/new")
              }}
            >
              Add Vehicle
            </button>
          </div>
        </section>     
          {this.props.garage.map(vehicle => (
            <div key={vehicle.id} className="card">
              <div className="card-body">
                <h5 className="card-title"> {vehicle.vehicleName} </h5>              
                <img src={vehicle.vehicleImageURL} className="img-fluid vehicleImage" alt="Vehicle Thumbnail"/>      <h6>Model Year: {vehicle.modelYear} </h6> 
                <h6>Make: {vehicle.make} </h6>
                <h6>Model: {vehicle.model} </h6> 
                <h6>Edition: {vehicle.edition} </h6>
                <h6>Engine Size: {vehicle.engineSize} </h6>
                <h6>Current Mileage: {vehicle.vehicleMileage} </h6>
                <button
                  id={vehicle.id}
                  onClick={() => this.props.vehicleTasksSelector(vehicle.id)}
                  className="btn btn-primary"
                >
                  Maintenance Tasks
                </button>
                <button 
                  onClick={() => this.props.deleteVehicle(vehicle.id)}
                  className="btn btn-primary"
                >
                  Delete
                </button>
                <button
                  onClick={() => {this.props.history.push(`/garage/${vehicle.id}/edit`)}}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </section>
        </article>
      </React.Fragment>
    )
  }
}
