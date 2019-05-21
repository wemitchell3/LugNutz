import React, { Component } from "react"
import UserManager from "../users/UserManager"

export default class Login extends Component {

    state = {
        userName: "",
        email: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    
    handleLogin = event => {
        event.preventDefault()
        UserManager.getAll()
        .then(userList => {
            let tempUserName = userList.find(element => element.userName.toLowerCase() ===
            this.state.userName.toLowerCase() && element.email.toLowerCase() ===
            this.state.email.toLowerCase())
            if (tempUserName) {
                sessionStorage.setItem("userId", tempUserName.id)
                this.props.onLogin()
                this.props.history.push("/garage") 
            } else {
                window.alert("Either User Name and/or Email Not Found!")
        }})

    }

    render() {
        return (
            <React.Fragment>
            <article className="contentContainer">
            <form onSubmit={this.handleLogin} className="content">
                <h1 className="title">Please Log In</h1>
                <label htmlFor="userName" className="label">
                    User Name
                </label>
                <input onChange={this.handleFieldChange} 
                    type="userName"
                    className="form-control"
                    id="userName"
                    placeholder="user Name"
                    required="" autoFocus="" />
                <label htmlFor="email" className="label">
                    Email
                </label>
                <input onChange={this.handleFieldChange} 
                    className="form-control"
                    type="email"
                    id="email"
                    placeholder="email"
                    required="" />
                <button type="submit"
                    onClick={() => this.handleLogin}
                    className="btn btn-primary">
                    Sign in
                </button>
                <button type="Register"
                    onClick={() => {this.props.history.push("/login/new")}}
                    className="btn btn-primary">
                    Register
                </button>
            </form>
            </article>
            </React.Fragment>
        )
    }
}