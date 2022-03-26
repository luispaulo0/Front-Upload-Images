import React from 'react'
import Cookies from "universal-cookie";
import "../Styles/Nav.css";
const cookies = new Cookies()

class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
            categorias: []
        }
    }
    cerrarSesion() {
        cookies.remove("login", { path: "/" })
        window.location.href = "/"
        window.localStorage.removeItem("token")
    }
    render() {
        return (
            <nav className="navbar navbar-light nav-size" >
                <div className="container">
                    <img className="img-settings" src="/app/assets/icons/Pear.png" alt=""/>
                    <p className="sesion-nav" aria-current="page" onClick={this.cerrarSesion.bind(this)}>Cerrar sesión</p>
                </div>
            </nav>
        )
    }
}
export default Nav;