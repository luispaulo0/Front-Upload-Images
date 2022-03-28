import React from 'react'

import "../Styles/Nav.css";


class Nav extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-light nav-size" >
                <div className="container">
                    <img className="img-settings" src="/app/assets/icons/Pear.png" alt=""/>
                </div>
            </nav>
        )
    }
}
export default Nav;