import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import MaintenanceTasksForm from "./MaintenanceTasksForm";
import "./maintenanceTasks.css";

export default class MaintenanceTasksFormToggle extends Component {
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
    vehicleName: "",
    showForm: false
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
        vehicleId: Number(this.state.vehicleId),
        vehicleName: `${this.state.vehicleName.modelYear} ${
          this.state.vehicleName.make
        } ${this.state.vehicleName.model}`
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

  // Function for the task completed input check box, that if the box is checked,
  // the value in state will be change from false to true. the "!" in the the folloing code
  // is what is causing the state of false to be flipped to true. !this.state[event.target.id]

  handleCheckBox = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = !this.state[event.target.id];
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
    this.setState({ showForm: true });
  };

  // This creates form elements and captures user inputs when submit is clicked by invoking the
  // handleFieldChange function.

  render() {
    return (
      <React.Fragment>
        <article className="contentContainer">
          <section className="content">
            <form className="taskForm">
              <p className="label">
                Add a previously performed repair/maintenance task or add a
                future one to be completed.
              </p>
              <div className="form-group">
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                >
                  <DropdownToggle caret>Select Vehicle</DropdownToggle>
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
              <p className="vehicleName">
                    {this.state.vehicleName.modelYear}{" "}
                    {this.state.vehicleName.make}{" "}{this.state.vehicleName.model}
                  </p>
              {this.state.showForm && (
                <MaintenanceTasksForm
                  handleCheckBox={this.handleCheckBox}
                  isComplete={this.state.isComplete}
                  constructNewTask={this.constructNewTask}
                  getDate={this.props.getDate}
                  addTask={this.props.addTask}
                  vehicleId={this.state.vehicleId}
                  vehicleName={this.state.vehicleName}
                />
              )}
            </form>
          </section>
        </article>
      </React.Fragment>
    );
  }
}
