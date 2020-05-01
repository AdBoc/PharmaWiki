import React from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav className="navbar">
            <Link to={'/'}><p>Menu</p></Link>
            <Link to={'/'}><p>logo</p></Link>
            <Link to={'/login'}><p>language icon/logout</p></Link>
        </nav>
    )
}