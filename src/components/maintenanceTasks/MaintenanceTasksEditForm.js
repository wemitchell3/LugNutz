import React, { Component } from "react"
import MaintenanceTasksManager from "./MaintenanceTasksManager"

export default class MaintenanceTasksEditForm extends Component {
  state = {
    userId: "",
    taskName: "",
    taskDescription: "",
    targetDate: "",
    isComplete: "",
    taskMileage: "",
    apptRequest: "",
    taskTimeStamp: "",
    appointmentDate: "",
    masterMechanicId: ""
  }

  updateExistingTask = event => {
    event.preventDefault()
    const task = {
      userId: 1,
      //   Number(sessionStorage.getItem("userId"))
      id: Number(this.props.match.params.taskId),
      taskName: this.state.taskName,
      taskDescription: this.state.taskDescription,
      targetDate: this.state.targetDate,
      isComplete: this.state.isComplete,
      taskMileage: this.state.taskMileage,
      apptRequest: this.state.apptRequest,
      taskTimeStamp: this.state.taskTimeStamp,
      appointmentDate: this.state.appointmentDate,
      masterMechanicId: this.state.masterMechanicId
    }
    this.props
      .updateTask(task)
      .then(() => this.props.history.push("/maintenanceTasks"))
    this.props.userSpecificData()
  }

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
        masterMechanicId: task.masterMechanicId
      })
    })
  }

  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  // Function for the task completed input check box, that if the box is checked,
  // the value in state will be change from false to true. the "!" in the the folloing code
  // is what is causing the state of false to be flipped to true. !this.state[event.target.id]
  handleCheckBox = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = !this.state[event.target.id]
    this.setState(stateToChange)
  }

  render() {
    return (
      <React.Fragment>
        <form className="card">
          <div className="form-group">
            <label htmlFor="taskName"> Task Name </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="taskName"
              value={this.state.taskName}
            />
            <label htmlFor="taskDescription"> Task Description </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="taskDescription"
              value={this.state.taskDescription}
            />
            <label htmlFor="targetDate"> Target Completion Date </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="targetDate"
              value={this.state.targetDate}
            />
            <label htmlFor="taskMileage"> Task Mileage </label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="taskMileage"
              value={this.state.taskMileage}
            />
            <label> Click CheckBox if Complete: </label>
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
                onClick={this.updateExistingTask}
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
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}
