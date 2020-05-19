import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div>
        <span>
          {this.context.user.name}
        </span>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link className="navLink" to='/login'>Login</Link>
        {' '}
        <Link className="navLink"to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header role="navigation">
        <div className="flex header-content">
        <h1>
          <Link to='/' className="navLink headerTitle">
            Spaced repetition
          </Link>
        </h1>
        <div id="logo"></div>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
          </div>
      </header>
      
    );
  }
}

export default Header
