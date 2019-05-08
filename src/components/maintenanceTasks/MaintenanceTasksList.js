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

export default class MaintenanceTasksList extends Component {
  state = {
    dropdownOpen: false,
    showTasks: false
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    return (
      <React.Fragment>
        <article className="contentContainer">
          <h1>My Maintenance Tasks</h1>
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
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>Filter by Vehicle</DropdownToggle>
            <DropdownMenu>
              {this.props.garage.map(vehicle => {
                return (
                  <DropdownItem
                    key={vehicle.id}
                    id={vehicle.id}
                    onClick={() => this.props.vehicleTasksSelector(vehicle.id)}
                  >
                    {`${vehicle.modelYear} ${vehicle.make} ${vehicle.model}`}
                  </DropdownItem>
                );
              })}
              <DropdownItem onClick={() => this.props.userSpecificData()} >
                All Vehicles
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <section>
            {this.props.maintenanceTasks.map(task => (
              <div key={task.id} className="card">
                <div className="card-body">
                  <h5 className="card-title">Task: {task.taskName} </h5>
                  <div>
                    <Button
                      color="primary"
                      id={`t${task.id}`}
                      style={{ marginBottom: "1rem" }}
                    >
                      Details
                    </Button>
                    <UncontrolledCollapse toggler={`#t${task.id}`}>
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
