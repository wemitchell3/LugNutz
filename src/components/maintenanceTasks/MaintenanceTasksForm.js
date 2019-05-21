import React, { Component } from "react";
import { withRouter } from "react-router";

class MaintenanceTasksForm extends Component {
  state = {
    userId: "",
    taskName: "",
    taskDescription: "",
    targetDate: "",
    isComplete: false,
    taskMileage: "",
    apptRequest: "",
    taskTimeStamp: "",
    appointmentDate: "",
    masterMechanicId: "",
    vehicleId: "",
    vehicleName: ""
  };
  
  constructNewTask = event => {
    event.preventDefault();

    if (this.state.maintenanceTasks === "") {
      window.alert("Please enter a task");
    } else {
      const task = {
        userId: Number(sessionStorage.getItem("userId")),
        taskName: this.state.taskName,
        taskDescription: this.state.taskDescription,
        targetDate: this.state.targetDate,
        isComplete: this.state.isComplete,
        taskMileage: this.state.taskMileage,
        apptRequest: this.state.apptRequest,
        taskTimeStamp: this.props.getDate(new Date()),
        appointmentDate: this.state.appointmentDate,
        masterMechanicId: this.state.masterMechanicId,
        vehicleId: Number(this.props.vehicleId),
        vehicleName: `${this.props.vehicleName.modelYear} ${this.props.vehicleName.make} ${this.props.vehicleName.model}`
      };
      // Create the task and redirect user to the task list
      this.props
        .addTask(task)
        .then(() => this.props.history.push("/maintenanceTasks"));
    }
  };

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="taskName" className="label">
            Maintenance Task Name
          </label>
          <input
            type="text"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="taskName"
            placeholder="Task Name?"
          />
        </div>
        <div className="form-group">
          <label htmlFor="taskDescription" className="label">
            Maintenance Task Description
          </label>
          <input
            type="text"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="taskDescription"
            placeholder="Task Description?"
          />
        </div>
        <div className="form-group">
          <label htmlFor="targetDate" className="label">
            Target Completion Date
          </label>
          <input
            type="date"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="targetDate"
            placeholder="Target Completion Date?"
          />
        </div>
        <div className="form-group">
          <label htmlFor="taskMileage" className="label">
            Task Mileage
          </label>
          <input
            type="text"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="taskMileage"
            placeholder="Mileage task needs to be completed by?"
          />
        </div>
        <div>
          <label className="label">
            Click CheckBox if Complete:
            <input
              type="checkbox"
              className="btn btn-success"
              id="isComplete"
              value={this.props.isComplete}
              onChange={this.props.handleCheckBox}
            />
          </label>
        </div>
        <button
          type="submit"
          onClick={this.constructNewTask}
          className="btn btn-primary"
        >
          Submit
        </button>
        <button
          type="submit"
          onClick={() => this.props.history.push("/maintenanceTasks")}
          className="btn btn-primary"
        >
          Cancel
        </button>
      </React.Fragment>
    );
  }
}
export default withRouter(MaintenanceTasksForm)
