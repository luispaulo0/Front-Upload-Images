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
                        <img src="app/assets/icons/arrow_circle_left_white_24dp.svg" className={"flecha"} alt="" />
                    </Link>
                    <div className={"cont"}>
                        <p className={"title"}>Crear tu Pear ID</p>
                        <br/>
                        <p className="info">Sólo necesitas un Pear ID para acceder a todos los servicios de Pear.</p>

                        <input type="text"
                               className="form-control-1 form-control"
                               name="nombre"

                               placeholder="Nombre"
                               aria-describedby="nombreHelp"
                               value={this.state.nombre}
                               onChange={this.changeField.bind(this)} />

                        <input type="text"
                               className="form-control-2 form-control"
                               name="apellido"
                               placeholder="Apellido"
                               aria-describedby="apellidoHelp"
                               value={this.state.apellido}
                               onChange={this.changeField.bind(this)} />
                        <br/>
                        <br/>

                        <label className="input" htmlFor="username">Pear ID</label>
                        <input type="text"
                               className="form-control input"
                               name="username"
                               id="username"
                               placeholder="Ingrese su nombre de usuario"
                               aria-describedby="loginHelp"
                               value={this.state.username}
                               onChange={this.changeField.bind(this)}
                               onBlur={this.usernameValidate.bind(this)}
                        />

                        <div className="message" id="usernameMessage"
                             ref={self => this.labelUser = self}
                             className="form-text ">
                        </div>

                        <label className="input" htmlFor="password"> Contraseña</label>
                        <input type="text"
                               className="form-control input"
                               name="password"
                               id="password"
                               placeholder="Ingrese su contraseña"
                               aria-describedby="passwordHelp"
                               value={this.state.password}
                               onChange={this.changeField.bind(this)} />
                        <div>
                            <button type="button" id="reload" className="btn button opacity-100" onClick={this.buttonOnClick.bind(this)} defaultValue={"Registrar"}>Registrate</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;