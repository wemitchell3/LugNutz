import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import React, { Component } from "react";
// import GarageEditForm from "./garage/GarageEditForm";
import GarageForm from "./garage/GarageForm";
import GarageList from "./garage/GarageList";
import GarageManager from "./garage/GarageManager";
// import Login from "./loginOut/Login";
// import LoginForm from "./loginOut/LoginForm";
// import MaintenanceTaskEditForm from "./maintenanceTasks/MaintenanceTaskEditForm";
// import MaintenanceTaskForm from "./maintenanceTasks/MaintenanceTaskForm";
// import MaintenanceTaskList from "./maintenanceTasks/MaintenanceTaskList";
// import MaintenanceTaskManager from "./maintenanceTasks/MaintenanceTaskManager";
// import MessageEditForm from "./messages/MessageEditForm";
// import MessageForm from "./messages/MessageForm";
// import MessageList from "./messages/MessageList";
// import MessageManager from "./messages/MessageManager";
import UserManager from "./users/UserManager";

class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  state = {
    users: [],
    garage: [],
    maintenanceTasks: [],
    messages: [],
    userId: []
  };

  componentDidMount() {
    this.userSpecificData();
  }

  userSpecificData = () => {
    const newState = {};
    let currentUserId = 1;
    UserManager.getAll(currentUserId)
      .then(users => (newState.users = users))
      .then(() =>
        GarageManager.getAll(currentUserId).then(
          garage => (newState.garage = garage)
        )
      )
      //   .then(() =>
      //     MaintenanceTaskManager.getAll(currentUserId).then(
      //       maintenanceTasks => (maintenanceTasks.newState = maintenanceTasks)
      //     )
      //   )
      //   .then(() =>
      //     MessageManager.getAll(currentUserId).then(
      //       messages => (messages.newState = messages)
      //     )
      //   )
      .then(() => this.setState(newState));
  };

  //   onLogin = () => {
  //     this.userSpecificData();
  //   };

  //   onLogout = () => {
  //     sessionStorage.clear();
  //   };

  addGarageVehicle = vehicle => {
    return GarageManager.postVehicle(vehicle).then(() =>
      this.userSpecificData()
    );
  };

  deleteVehicle = vehicle => {
      return GarageManager.deleteVehicle(vehicle).then(() =>
        this.userSpecificData()
        )
  }

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/garage"
          render={props => {
            return (
              <GarageList {...props}  garage={this.state.garage} 
              userSpecificData={this.userSpecificData}
              deleteVehicle={this.deleteVehicle} />
            );
          }}
        />
        <Route
          path="/garage/new"
          render={props => {
            return (
              <GarageForm {...props} addGarageVehicle={this.addGarageVehicle} />
            );
          }}
        />
      </React.Fragment>
    );
  }
}
export default withRouter(ApplicationViews);
