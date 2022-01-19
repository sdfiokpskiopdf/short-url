import { MenuItems } from './MenuItems'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function NavBar() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [showMenu, setShowMenu] = useState(false)

    const handleClick = (index) => {
        setActiveIndex(index)
    }

    return (
        <nav className="NavbarItems">
            <div className="top">
                <h1>URL Shortener</h1>

                <div className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
                    <i className={showMenu ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
            </div>
            <ul className={showMenu ? "nav-menu active" : "nav-menu"}>
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