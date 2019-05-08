import React, { Component } from "react"
import UserManager from "../users/UserManager"

export default class RegistrationForm extends Component {
  state = {
    userName: "",
    email: "",
    userId: ""
  }

  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

  newUser = event => {
    event.preventDefault()
    const user = {
      userName: this.state.userName,
      email: this.state.email
    }
    this.props
      .addUser(user)
      .then(() =>
        UserManager.getAll().then(userList => {
          let tempUserName = userList.find(
            element =>
              element.userName.toLowerCase() ===
                this.state.userName.toLowerCase() &&
              element.email.toLowerCase() === this.state.email.toLowerCase()
          )
          if (tempUserName) {
            sessionStorage.setItem("userId", tempUserName.id)
            this.props.onLogin()
            this.props.history.push("/garage")
          }
        })
      )
      .then(() => this.props.userSpecificData())
  }

  render() {
    return (
      <React.Fragment>
        <article className="contentContainer">
        <form className="card">
          <div className="form-group">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="userName"
              placeholder="user name"
              value={this.state.userName}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="email"
              placeholder="email"
              value={this.state.email}
            />
            <button
              type="submit"
              onClick={this.newUser}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
        </article>
      </React.Fragment>
    )
  }
}
