import React from 'react'
import './navbar.scss'
import './nav'
// import { Link } from 'react-router-dom';

const toggleMenuClasses = () => {
    let hamburgerIcon = document.getElementById('hamburger');
    hamburgerIcon.classList.toggle('hamburger--active');
    let mobileMenu = document.getElementById('navigation');
    mobileMenu.classList.toggle('navigation--active');
    console.log('clicked');
}

export default function Nav() {
    return (
        // <nav className="navbar">
        //     <button className="hamburger">
        //         <span className="hamburger__box">
        //             <span className="hamburger__inner"></span>
        //         </span>
        //     </button>

        //     <ul className="navbar__list">
        //         <li className="navbar__item">Hamburg Menu</li>
        //         <li className="navbar__item">DrugsWIKI</li>
        //         <li className="navbar__item">Login/Logout</li>
        //     </ul>
        // </nav>
        <div>
            <div className="hamburger" id="hamburger" onClick={toggleMenuClasses}>
                <span className="hamburger__box">
                    <span className="hamburger__inner"></span>
                </span>
            </div>
            <div className="navigation" id="navigation">
                <ul className="navigation__list">
                    <li className="navigation__item">Drugs</li>
                    <li className="navigation__item">Substances</li>
                    <li className="navigation__item">Login</li>
                    <li className="navigation__item">Logout</li>
                </ul>
            </div>
        </div>
    )
}