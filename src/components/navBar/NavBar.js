import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                        <Link className="nav-link" to="/">Login</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/garage">Garage</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/maintenanceTasks">Maintenance Tasks</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/messages">Chat Forum</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/wishList">Wish List</Link>
                    </li> */}
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/friends">Friends</Link>
                    </li> */}
                    <li className="nav-item">
                        <Link 
                        onClick={() => sessionStorage.clear()} className="nav-link" to="/">
                        Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar