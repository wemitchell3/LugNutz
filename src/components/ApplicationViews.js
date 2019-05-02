import { withRouter } from "react-router"
import { Route } from "react-router-dom"
import React, { Component } from "react"
import GarageEditForm from "./garage/GarageEditForm"
import GarageForm from "./garage/GarageForm"
import GarageList from "./garage/GarageList"
import GarageManager from "./garage/GarageManager"
// import Login from "./loginOut/Login"
// import LoginForm from "./loginOut/LoginForm"
// import MaintenanceTasksEditForm from "./maintenanceTasks/MaintenanceTasksEditForm"
import MaintenanceTasksForm from "./maintenanceTasks/MaintenanceTasksForm"
import MaintenanceTasksList from "./maintenanceTasks/MaintenanceTasksList"
import MaintenanceTasksManager from "./maintenanceTasks/MaintenanceTasksManager"
// import MessageEditForm from "./messages/MessageEditForm"
// import MessageForm from "./messages/MessageForm"
// import MessageList from "./messages/MessageList"
// import MessageManager from "./messages/MessageManager"
import UserManager from "./users/UserManager"

class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null

  state = {
    users: [],
    garage: [],
    maintenanceTasks: [],
    messages: [],
    userId: []
  }

  componentDidMount() {
    this.userSpecificData()
  }

  userSpecificData = () => {
    const newState = {}
    let currentUserId = 1
    UserManager.getAll(currentUserId)
    .then(users => (newState.users = users))
    .then(() => GarageManager.getAll(currentUserId))
    .then(garage => (newState.garage = garage))
    .then(() => MaintenanceTasksManager.getAll(currentUserId))
    .then(maintenanceTasks => (newState.maintenanceTasks = maintenanceTasks))
      //   .then(() =>
      //     MessageManager.getAll(currentUserId).then(
      //       messages => (newState.messages = messages)
      //     )
      //   )
    .then(() => this.setState(newState))
  }

  //   onLogin = () => {
  //     this.userSpecificData()
  //   }

  //   onLogout = () => {
  //     sessionStorage.clear()
  //   }

  addVehicle = vehicle => {
    return GarageManager.postVehicle(vehicle).then(() =>
      this.userSpecificData()
    )
  }

  deleteVehicle = vehicle => {
      return GarageManager.deleteVehicle(vehicle).then(() =>
        this.userSpecificData()
        )
  }
  
  updateVehicle = editedVehicle => {
    return GarageManager.putVehicle(editedVehicle)
    .then(() => this.userSpecificData())
  }

  addMaintenanceTask = task => {
    return MaintenanceTasksManager.postTask(task).then(() =>
      this.userSpecificData()
    )
  }

  getDate = date => {
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    let day = date.getDate()
    let monthIndex = date.getMonth()
    let year = date.getFullYear()
    let hour = date.getHours()
    let minutes = date.getMinutes()
  
    return monthNames[monthIndex]  + ' ' + day + ' ' + year + ' ' + hour + ':' + minutes
  }

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/garage"
          render={props => {
            return (
              <GarageList {...props}
              garage={this.state.garage} 
              userSpecificData={this.userSpecificData}
              deleteVehicle={this.deleteVehicle} 
              />
            )
          }}
        />
        <Route
          path="/garage/new"
          render={props => {
            return (
              <GarageForm {...props} 
              addVehicle={this.addVehicle} 
              />
            )
          }}
        />
        <Route
          exact
          path="/garage/:vehicleId(\d+)/edit"
          render={props => {
            return (
            <GarageEditForm {...props} 
            updateVehicle={this.updateVehicle} 
            userSpecificData={this.userSpecificData} 
            />
            )
          }}
        />
        <Route
          exact
          path="/maintenanceTasks"
          render={props => {
            return (
              <MaintenanceTasksList {...props} 
              maintenanceTasks={this.state.maintenanceTasks} 
              userSpecificData={this.userSpecificData}
              />
            )
          }}
        />
        <Route
          path="/maintenanceTasks/new"
          render={props => {
            return (
              <MaintenanceTasksForm {...props} 
              addMaintenanceTask={this.addMaintenanceTask}
              getDate={this.getDate} 
              />
            )
          }}
        />
      </React.Fragment>
    )
  }
}
export default withRouter(ApplicationViews)
