import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';


class Navigation extends React.Component {

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { auth, navMenu } = this.props;
    const { isAuthenticated } = auth;

    const menuItems = navMenu.map((menu) =>
      <li key={menu.id}><a href={"#"+menu.name}>{menu.name}</a></li>
    );

    const guestLinks = (
      <ul className="nav navbar-nav">
        <li className="current"><a href="#intro">Home</a></li>
        { menuItems }
        <li><a href="/signup">Sign Up</a></li>
        <li><a href="/signin">Sign In</a></li>
      </ul>
    );

    const userLinks = (
      <ul className="nav navbar-nav">
        <li className="current"><a href="#intro">Home</a></li>
        { menuItems }
        <li><a href="#" onClick={this.logout}>Logout</a></li>
      </ul>
    );

    return(
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
              <span className="sr-only">Toggle nav</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            {/* Logo text or image */}
            <a className="navbar-brand" href="index.html">Alstar</a>
          </div>
          <div className="navigation collapse navbar-collapse navbar-ex1-collapse">
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = {
  auth: PropTypes.object.isRequired,
  logout : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Navigation);
