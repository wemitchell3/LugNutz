import React, { Component } from "react"

export default class GarageList extends Component {

    render() {
        return (
            <React.Fragment>
                <section className="card">
                    <div className="taskButton">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/garage/new")
                            }}
                        >
                            Add Vehicle
                        </button>
                    </div>
                </section>
                <h1>My Vehicles</h1>
                <section>
                    {this.props.garage.map(vehicle => (
                        <div key={vehicle.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{vehicle.title}</h5>
                                    <h6>{vehicle.modelYear}</h6>
                                    <h6>{vehicle.make}</h6>
                                    <h6>{vehicle.model}</h6>
                                    <h6>{vehicle.edition}</h6>
                                    <h6>{vehicle.engineSize}</h6>
                                { <button
                                    onClick={() => this.props.deleteVehicle(vehicle.id)}
                                    className="btn btn-success">
                                    Delete
                                    </button> }
                                    {/* <button
                                    onClick={() => {
                                        this.props.history.push(`/garage/${vehicle.id}/edit`)
                                    }}
                                    className="btn btn-success">
                                    Edit
                                    </button> */}
                            </div>
                        </div>
                    ))}
                </section>
            </React.Fragment>
        )
    }
}