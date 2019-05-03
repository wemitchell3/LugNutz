import { withRouter } from "react-router"
import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import GarageEditForm from "./garage/GarageEditForm"
import GarageForm from "./garage/GarageForm"
import GarageList from "./garage/GarageList"
import GarageManager from "./garage/GarageManager"
import Login from "./loginOut/Login"
import RegistrationForm from "./loginOut/RegistrationForm"
import MaintenanceTasksEditForm from "./maintenanceTasks/MaintenanceTasksEditForm"
import MaintenanceTasksForm from "./maintenanceTasks/MaintenanceTasksForm"
import MaintenanceTasksList from "./maintenanceTasks/MaintenanceTasksList"
import MaintenanceTasksManager from "./maintenanceTasks/MaintenanceTasksManager"
import MessageEditForm from "./messages/MessageEditForm"
import MessageForm from "./messages/MessageForm"
import MessageList from "./messages/MessageList"
import MessageManager from "./messages/MessageManager"
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
    
    let currentUserId = sessionStorage.getItem("userId")
    
    UserManager.getAll(currentUserId)
    .then(users => (newState.users = users))
    .then(() => GarageManager.getAll(currentUserId))
    .then(garage => (newState.garage = garage))
    .then(() => MaintenanceTasksManager.getAll(currentUserId))
    .then(maintenanceTasks => (newState.maintenanceTasks = maintenanceTasks))
    .then(() =>MessageManager.getAll(currentUserId)
    .then(messages => (newState.messages = messages)))
    .then(() => this.setState(newState))
  }

  onLogin = () => {
    this.userSpecificData()
  }

  addUser = user =>
    UserManager.postUser(user)

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

  addTask = task => {
    return MaintenanceTasksManager.postTask(task).then(() =>
      this.userSpecificData()
    )
  }

  deleteTask = task => {
    return MaintenanceTasksManager.deleteTask(task).then(() =>
      this.userSpecificData()
      )
}

  updateTask = editedTask => {
    return MaintenanceTasksManager.putTask(editedTask)
    .then(() => this.userSpecificData())
  }

  addMessage = message => {
    return MessageManager.postMessage(message)
    .then(() =>MessageManager.getAll()
    .then(messages => this.setState({ "messages" : messages })))
    .then(() => this.userSpecificData())
  }

  deleteMessage = message => {
    return MessageManager.deleteMessage(message)
    .then(() =>MessageManager.getAll()
    .then(messages => this.setState({ "messages" : messages })))
    .then(() => this.userSpecificData())
  }

  updateMessage = editedMessage => {
    return MessageManager.putMessage(editedMessage)
    .then(() =>MessageManager.getAll())
    .then(messages => this.setState({ "messages" : messages }))
    .then(() => this.userSpecificData())
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
    // let hour = date.getHours()
    // let minutes = date.getMinutes()
  
    return monthNames[monthIndex]  + ' ' + day + ' ' + year 
  }

  render() {
    return (
      <React.Fragment>
        <Route 
        exact 
        path="/" 
        render={props => {
          return <Login {...props} 
          onLogin={this.onLogin} 
          userSpecificData={this.userSpecificData} 
           />
        }}
        />
        <Route 
        exact 
        path="/login/new" 
        render={props => {
          return <RegistrationForm {...props} 
          addUser={this.addUser} 
          onLogin={this.onLogin} 
          userSpecificData={this.userSpecificData}
            />    
        }}
        />
        <Route
          exact
          path="/garage"
          render={props => {
            if (this.isAuthenticated()) {
            return <GarageList {...props}
              garage={this.state.garage} 
              userSpecificData={this.userSpecificData}
              deleteVehicle={this.deleteVehicle} 
              />
            } else {
              return < Redirect to="/"
              />
            }
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
            if (this.isAuthenticated()) {
            return <MaintenanceTasksList {...props} 
              maintenanceTasks={this.state.maintenanceTasks} 
              userSpecificData={this.userSpecificData}
              deleteTask={this.deleteTask}
              />
            } else {
              return < Redirect to="/"
              />
            }
          }}
        />
        <Route
          path="/maintenanceTasks/new"
          render={props => {
            return (
              <MaintenanceTasksForm {...props} 
              addTask={this.addTask}
              getDate={this.getDate} 
              />
            )
          }}
        />
        <Route
          exact
          path="/maintenanceTasks/:taskId(\d+)/edit"
          render={props => {
            return (
            <MaintenanceTasksEditForm {...props} 
            updateTask={this.updateTask} 
            userSpecificData={this.userSpecificData} 
            />
            )
          }}
        />
        <Route
          exact
          path="/messages"
          render={props => {
            if (this.isAuthenticated()) {
            return <MessageList {...props}
              messages={this.state.messages.reverse()} 
              userSpecificData={this.userSpecificData}
              users={this.state.users} 
              addMessage={this.addMessage}
              deleteMessage={this.deleteMessage} 
              />
            } else {
              return < Redirect to="/"
              />
            }
          }}
        />
        <Route
          path="/messages/new"
          render={props => {
            return (
              <MessageForm {...props}  
              userSpecificData={this.userSpecificData}
              />
            )
          }}
        />
        <Route
          exact
          path="/messages/:messageId(\d+)/edit"
          render={props => {
            return (
            <MessageEditForm {...props} 
            updateMessage={this.updateMessage} 
            userSpecificData={this.userSpecificData} 
            />
            )
          }}
        />
      </React.Fragment>
    )
  }
}
export default withRouter(ApplicationViews)
