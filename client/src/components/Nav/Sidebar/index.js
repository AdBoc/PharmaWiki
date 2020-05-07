import React from 'react'
import './sideDrawer.scss'
import { Link } from 'react-router-dom';

export default function SideBar(props) {
    return (
        <div>
            <div className="sideDrawer">
                <ul>
                    <Link to={'/products'} onClick={props.changeStatus}><li>Drugs</li></Link>
                    <Link to={'/substances'} onClick={props.changeStatus}><li>Substances</li></Link>
                    <Link to={'/user'} onClick={props.changeStatus}><li>User</li></Link>
                    <Link to={'/login'} onClick={props.changeStatus}><li>Login/Logout</li></Link>
                </ul>
            </div>
            <div className="backdrop" onClick={props.click}></div>
        </div>
    )
}
