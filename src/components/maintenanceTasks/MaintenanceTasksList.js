// Use reactstrap collapse feature on each maintenance task to only show the name of each task
// and when clicked, it will show the details of each task

import React, { Component } from "react";
import {
  UncontrolledCollapse,
  Button,
  CardBody,
  Card,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./maintenanceTasks.css";

export default class MaintenanceTasksList extends Component {
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
    showName: false
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
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
      name => name.id === parseInt(event.target.value)
    );
    const stateToChange = {};
    stateToChange.vehicleName = vehicleName;
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
    // this.setState({ showForm: true });
  };

  render() {
    console.log(this.props.garage);
    return (
      <React.Fragment>
        <article className="contentContainer">
          <h1 className="title">My Maintenance Tasks</h1>
          <section>
            <div className="taskButton">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.props.history.push("/maintenanceTasks/new");
                }}
              >
                Add Maintenance Task
              </button>
            </div>
          </section>
          <ButtonDropdown
            className="taskButton"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
          >
            <section>
              <DropdownToggle caret>Filter by Vehicle</DropdownToggle>
            </section>
            <DropdownMenu>
              {this.props.garage.map(vehicle => {
                return (
                  <DropdownItem
                    key={vehicle.id}
                    // onClick={this.handleVehicleName}
                    onClick={() => this.props.vehicleTasksSelector(vehicle.id)}
                    id="vehicleId"
                    value={vehicle.id}
                  >
                    {`${vehicle.modelYear} ${vehicle.make} ${vehicle.model}`}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </ButtonDropdown>
          <section>
           {this.props.maintenanceTasks.length > 0 && this.props.showName === true &&               
              <p className="vehicleName">
              {this.props.maintenanceTasks[0].vehicleName}
              </p>
          }
          </section>
          <section>
            {this.props.maintenanceTasks.map(task => (
              <div key={task.id} className="card">
                <div className="card-body">
                  <h5 className="card-title">Task: {task.taskName} </h5>
                  <h6>Vehicle Name: {task.vehicleName} </h6>
                  <div>
                    <Button
                      color="primary"
                      id={`toggle${task.id}`}
                      style={{ marginBottom: "1rem" }}
                    >
                      Details
                    </Button>
                    <UncontrolledCollapse toggler={`#toggle${task.id}`}>
                      <Card>
                        <CardBody>
                          <h6>
                            <b>Task Description: </b> {task.taskDescription}
                          </h6>
                          <h6>
                            <b>Task Target Completion Date: </b>
                            {task.targetDate}
                          </h6>
                          <h6>
                            <b>Miles to be completed at: </b>
                            {task.taskMileage}
                          </h6>
                          <h6>
                            <b>Task Creation Date: </b>
                            {task.taskTimeStamp}
                          </h6>
                          <button
                            onClick={() => this.props.deleteTask(task.id)}
                            className="btn btn-primary"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              this.props.history.push(
                                `/maintenanceTasks/${task.id}/edit`
                              );
                            }}
                            className="btn btn-primary"
                          >
                            Edit
                          </button>
                        </CardBody>
                      </Card>
                    </UncontrolledCollapse>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </article>
      </React.Fragment>
    );
  }
}
