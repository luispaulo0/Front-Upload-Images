import React from 'react'
import Cookies from "universal-cookie";
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
            <div>
                <ul className="nav justify-content-center bg-transparent nav-tabs">
                    <li className="navs nav-pills nav-fill">
                        <button className="nav-link active bg-danger text-light" aria-current="page" onClick={this.cerrarSesion.bind(this)}>Cerrar sesión</button>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Nav;