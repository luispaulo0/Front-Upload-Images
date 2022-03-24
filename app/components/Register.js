import React from 'react'
import update from "immutability-helper";
import "../Styles/Register.css";
import APIInvoker from "../utils/APIInvoker"
import { Link } from "react-router-dom"

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            nombre: '',
            apellido: '',
            username: '',
            password: '',
        }
        this.status = false
        this.usernameOk = false
        this.token = false
    }
    changeField(e) {

        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state, {
            [field]: { $set: value }
        }))
    }
    buttonOnClick(e) {
        //Signup
        let user = {
            name: this.state.nombre,
            lastname: this.state.apellido,
            login: this.state.username,
            password: this.state.password
        }
        APIInvoker.invokePOST('/users/signup', user, data => {
            alert(JSON.stringify(data))
            if (data.status) {
                this.token = true
            }
        }, error => {
            alert(JSON.stringify(error))
        })
        e.preventDefault();
    }
    usernameValidate(e) {
        let login = this.state.username
        APIInvoker.invokeGET(`/users/usernameValidate/${login}`,
            data => {
                //let label = document.getElementById('usernameMessage')
                this.labelUser.innerHTML = data.message
            },
            error => {
                //let label = document.getElementById('usernameMessage')
                this.labelUser.innerHTML = error.message
            })
    }
    render() {
        console.log("render" + this.token)
        return (
            <div id="background-img">
                <div className="capa">
                    <Link to={"/login"}>
                        <img src="app/assets/images/flechaAtras.png" className={"flecha"} alt="" />
                    </Link>
                    <div className={"cont"}>
                        <p className={"title"}>Registro</p>
                        <div className={"nombre"}>
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text"
                                   className="form-control"
                                   name="nombre"
                                   id="nombre"
                                   placeholder="Ingrese su nombre"
                                   aria-describedby="nombreHelp"
                                   value={this.state.nombre}
                                   onChange={this.changeField.bind(this)} />
                        </div>
                        <div className={"apellido"}>
                            <label htmlFor="apellido">Apellido</label>
                            <input type="text"
                                   className="form-control"
                                   name="apellido"
                                   id="apellido"
                                   placeholder="Ingrese su apellido"
                                   aria-describedby="apellidoHelp"
                                   value={this.state.apellido}
                                   onChange={this.changeField.bind(this)} />
                        </div>
                        <div className={"username"}>
                            <label htmlFor="username">Login</label>
                            <input type="text"
                                   className="form-control"
                                   name="username"
                                   id="username"
                                   placeholder="Ingrese su nombre de usuario"
                                   aria-describedby="loginHelp"
                                   value={this.state.username}
                                   onChange={this.changeField.bind(this)}
                                   onBlur={this.usernameValidate.bind(this)}
                            />
                        </div>
                        <div id="usernameMessage"
                             ref={self => this.labelUser = self}
                             className="form-text text-white">
                        </div>
                        <div className={"password"}>
                            <label htmlFor="password"> Contraseña</label>
                            <input type="text"
                                   className="form-control"
                                   name="password"
                                   id="password"
                                   placeholder="Ingrese su contraseña"
                                   aria-describedby="passwordHelp"
                                   value={this.state.password}
                                   onChange={this.changeField.bind(this)} />
                        </div>
                        <div>
                            <input type="Button" id="reload" onClick={this.buttonOnClick.bind(this)} defaultValue={"Registrar"} className={"button"} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;