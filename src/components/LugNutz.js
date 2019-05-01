import React, { Component } from "react"
import NavBar from "./navBar/NavBar"
import ApplicationViews from "./ApplicationViews"
import "./lugNutz.css"
import "bootstrap/dist/css/bootstrap.min.css"

class LugNutz extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment>
    )
  }
}

export default LugNutz