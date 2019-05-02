import React, { Component } from "react"
// import Moment from 'react-moment'

export default class MaintenanceTasksList extends Component {
  render() {
      console.log(this.props.maintenanceTasks)
    return (
      <React.Fragment>
        <section className="card">
          <div className="taskButton">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push("/maintenanceTasks/new")
              }}
            >
              Add Maintenance Task
            </button>
          </div>
        </section>
        <h1>My Maintenance Tasks</h1>
        <section>          
          {this.props.maintenanceTasks.map(task => (
            <div key={task.id} className="card">
              <div className="card-body">
                <h5 className="card-title">Task: {task.taskName} </h5>
                <h6>Task Description: {task.taskDescription} </h6>
                <h6>Task Target Completion Date: {task.targetDate} </h6> 
                <h6> {task.isComplete} </h6>
                <h6>Miles to be completed at: {task.taskMileage} </h6>
                <h6> {task.apptRequest} </h6>
                <h6>Task Creation Date: {task.taskTimeStamp} </h6>
                {/* <Moment>{task.taskTimeStamp}</Moment> */}
                {/* <h6>Task Appointment Date: {task.appointmentDate} </h6>
                <h6>Mechanic Assigned To Task: {task.masterMechanicId} </h6> */}
                {/* <button
                    onClick={() => this.props.deleteTask(task.id)}
                    className="btn btn-success"
                >
                    Delete
                </button> */}
                <button
                    onClick={() => {this.props.history.push(`/maintenanceTasks/${task.id}/edit`)}}
                  className="btn btn-success"
                >
                    Edit
                </button>
              </div>
            </div>
          ))}
        </section>
      </React.Fragment>
    )
  }
}