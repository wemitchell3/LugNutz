import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./maintenanceTasks.css";

export default class MaintenanceTasksForm extends Component {
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
    showTasks: false,
    vehicleId: "",
    vehicleName: []
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  // Local method for input validation, creating a maintenance tasks object, and
  // invoking the function reference passed from parent component

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
        vehicleId: Number(this.state.vehicleId)
      };
      // Create the task and redirect user to the task list
      this.props
        .addTask(task)
        .then(() => this.props.history.push("/maintenanceTasks"));
    }
  };

  // Captures the inputed values and sets the state when the submit button is clicked.
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

  // This creates form elements and captures user inputs when submit is clicked by invoking the
  // handleFieldChange function.
  render() {
    return (
      <React.Fragment>
        <article className="contentContainer">
          <section className="content">
            <form className="taskForm">
              <p>
                Add a previously performed repair/maintenance task or add a
                future one to be completed.
              </p>
              <div className="form-group">
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                >
                  <DropdownToggle caret>Select Vehicle</DropdownToggle>
                  <p>
                    {this.state.vehicleName.modelYear}
                    {this.state.vehicleName.make} {this.state.vehicleName.model}
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
                          {`${vehicle.modelYear} ${vehicle.make} ${vehicle.model}`}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
              <div className="form-group">
                <label htmlFor="taskName">Maintenance Task Name</label>
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
                <label htmlFor="taskDescription">
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
                <label htmlFor="targetDate">Target Completion Date</label>
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
                <label htmlFor="taskMileage">Task Mileage</label>
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
                <label>
                  Click CheckBox if Complete:
                  <input
                    type="checkbox"
                    className="btn btn-success"
                    id="isComplete"
                    value={this.state.isComplete}
                    onChange={this.handleCheckBox}
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
            </form>
          </section>
        </article>
      </React.Fragment>
    );
  }
}
