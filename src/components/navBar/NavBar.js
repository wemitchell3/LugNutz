import React, { } from "react"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      collapsed: true
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <div className="fixed-top">
        <Navbar color="light" light>
          <NavbarBrand href="/" className="mr-auto">
            LugNutz
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">LogIn</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/garage/">Garage</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/maintenanceTasks/">Maintenance Tasks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/messages/">Chat Forum</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => sessionStorage.clear()}
                  className="nav-link"
                  href="/"
                >
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
