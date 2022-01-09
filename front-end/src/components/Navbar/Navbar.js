import React, { Component } from 'react'
import { MenuItems } from './MenuItems'
import './Navbar.css'

class NavBar extends Component {
    render() {
        return (
            <nav className="NavbarItems">
                <h1> URL Shortener</h1>
                <ul>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index} className="nav-link-container">
                                <a href={item.url} className={item.cName}>{item.title}</a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        );
    }
}

export default NavBar;