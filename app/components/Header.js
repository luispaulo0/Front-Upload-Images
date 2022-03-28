import React from "react";
import "../Styles/Header.css"
import Cookies from "universal-cookie";
const cookies = new Cookies()

class Header extends React.Component{
    constructor() {
        super();
        this.state = {
            categorias: []
        }
    }
    cerrarSesion() {
        cookies.remove("login", { path: "/" })
        cookies.remove("iduser", { path: "/" })
        window.location.href = "/"
        window.localStorage.removeItem("token")
    }
    render() {
        return(
            <div className=" background-header border-bottom" >
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="tittle" id="cloud">ECloud</p>
                            <p className="" id="photo">Fotos</p>
                        </div>
                        <div className="col">

                        </div>
                        <div className="col-lg-2">
                            <p type={"button"} className="header-nav2" defaultValue={"Exit"} aria-current="page" onClick={this.cerrarSesion.bind(this)}>Cerrar sesion</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;