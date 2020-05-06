import React, { Component } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SideDrawer from './Sidebar'
import { logout } from '../../actions/authActions';


class Nav extends Component {
    state = {
        sideDraw: false
    };

    sidebarClickHandle = () => {
        this.setState((prevState) => {
            return { sideDraw: !this.state.sideDraw }
        });
    };

    handleBackdrop = () => {
        this.setState({ sideDraw: false })
    }

    logoutButton = (e) => {
        e.preventDefault();
        this.props.logout();
        window.location.reload();
    }

    render() {
        return (
            <header className="Navbar">
                <nav className="Navbar__navigation">
                    <button className="toggleButton" onClick={this.sidebarClickHandle}>
                        <div className="toggleButton__line" />
                        <div className="toggleButton__line" />
                        <div className="toggleButton__line" />
                    </button>
                    {this.state.sideDraw ? <SideDrawer changeStatus={this.sidebarClickHandle} click={this.handleBackdrop} /> : null}
                    <div className="Navbar__navigation--logo"></div>
                    <div className="Navbar__navigation--items">
                        <ul>
                            {this.props.isLogged ? <li onClick={this.logoutButton}>Logout</li> : <Link to={'/login'}><li>Login</li></Link>}
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogged: state.authentication.isLogged,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);