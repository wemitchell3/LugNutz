import React, { Component } from "react";
import MaintenanceTasksManager from "./MaintenanceTasksManager";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class MaintenanceTasksEditForm extends Component {
  // Set initial state for the maintenance tasks component
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
    dropdownOpen: false,
    vehicleId: "",
    vehicleName: ""
  };

  updateExistingTask = event => {
    event.preventDefault();
    const task = {
      userId: Number(sessionStorage.getItem("userId")),
      id: Number(this.props.match.params.taskId),
      vehicleId: Number(this.state.vehicleId),
      taskName: this.state.taskName,
      taskDescription: this.state.taskDescription,
      targetDate: this.state.targetDate,
      isComplete: this.state.isComplete,
      taskMileage: this.state.taskMileage,
      apptRequest: this.state.apptRequest,
      taskTimeStamp: this.state.taskTimeStamp,
      appointmentDate: this.state.appointmentDate,
      masterMechanicId: this.state.masterMechanicId,
      vehicleName: `${this.state.vehicleName.modelYear} ${this.state.vehicleName.make} ${this.state.vehicleName.model}`
    };
    this.props
      .updateTask(task)
      .then(() => this.props.history.push("/maintenanceTasks"));
    this.props.userSpecificData();
  };

  componentDidMount() {
    MaintenanceTasksManager.get(this.props.match.params.taskId).then(task => {
      this.setState({
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        targetDate: task.targetDate,
        isComplete: task.isComplete,
        taskMileage: task.taskMileage,
        apptRequest: task.apptRequest,
        taskTimeStamp: task.taskTimeStamp,
        appointmentDate: task.appointmentDate,
        masterMechanicId: task.masterMechanicId,
        vehicleId: task.vehicleId,
        vehicleName: task.vehicleName
      });
    });
  }

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  handleVehicleName = event => {
    let vehicleName = this.props.garage.find(
      name => name.id === Number(event.target.value)
    );
    const stateToChange = {};
    stateToChange.vehicleName = vehicleName;
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  // Function for the task completed input check box, that if the box is checked,
  // the value in state will be change from false to true. the "!" in the the folloing code
  // is what is causing the state of false to be flipped to true. !this.state[event.target.id]
  handleCheckBox = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = !this.state[event.target.id];
    this.setState(stateToChange);
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    return (
      <React.Fragment>
        <section className="contentContainer">
          <form className="taskForm">
            <div className="form-group">
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggle}
              >
                <DropdownToggle caret>Select Vehicle</DropdownToggle>
                <p className="label">
                  {this.state.vehicleName.modelYear} {this.state.vehicleName.make} {this.state.vehicleName.model}
                </p>
                <DropdownMenu>
                  {this.props.garage.map(vehicle => {
                    return (
                      <DropdownItem
                        key={vehicle.id}
                        onClick={this.handleVehicleName}
                        id="vehicleId"
                        value={vehicle.id}
                      >
                        {`${vehicle.modelYear} ${vehicle.make} ${
                          vehicle.model
                        }`}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </ButtonDropdown>
            </div>
            <label htmlFor="taskName" className="label"> Task Name </label>
            <input
              type="text"
              required
              className="form-control"
              id="taskName"
              value={this.state.taskName}
              onChange={this.handleFieldChange}
            />
            <label htmlFor="taskDescription" className="label"> Task Description </label>
            <input
              type="text"
              required
              className="form-control"
              id="taskDescription"
              value={this.state.taskDescription}
              onChange={this.handleFieldChange}
            />
            <label htmlFor="targetDate" className="label"> Target Completion Date </label>
            <input
              type="text"
              required
              className="form-control"
              id="targetDate"
              value={this.state.targetDate}
              onChange={this.handleFieldChange}
            />
            <label htmlFor="taskMileage" className="label"> Task Mileage </label>
            <input
              type="text"
              required
              className="form-control"
              id="taskMileage"
              value={this.state.taskMileage}
              onChange={this.handleFieldChange}
            />
            <label className="label"> Click CheckBox if Complete: </label>
            <input
              type="checkbox"
              className="btn btn-success"
              id="isComplete"
              value={this.state.isComplete}
              onChange={this.handleCheckBox}
            />
            <div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.updateExistingTask}
              >
                Submit
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => this.props.history.push("/maintenanceTasks")}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </React.Fragment>
    );
  }
}
