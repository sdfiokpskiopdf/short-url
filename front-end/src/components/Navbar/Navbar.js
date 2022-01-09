import React, { Component } from 'react'
import { MenuItems } from './MenuItems'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function NavBar() {
    const [activeIndex, setActiveIndex] = useState(0)

    const handleClick = (index) => {
        setActiveIndex(index)
    }

    return (
        <nav className="NavbarItems">
            <h1>URL Shortener</h1>
            <ul>
                {MenuItems.map((item, index) => {
                    let cName = item.cName;

                    if (index == activeIndex) {
                        cName += ' active';
                    }

                    return (

                        <li key={index} className="nav-link-container">
                            {index != 3 ? <Link to={item.url} className={cName} onClick={() => handleClick(index)}>{item.title}</Link> : <a href={item.url} className={cName}>{item.title}</a>}
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
}

export default NavBar;