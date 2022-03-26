import React from 'react'
import "../Styles/Home.css"
import Nav from "./Nav"
import APIInvoker from "../utils/APIInvoker";
import Cookies from "universal-cookie";
import CardImages from "./CardImages";
const cookies = new Cookies()

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            token: false,
            images: []
        }

        this.token = false,
            this.images = []

    }
    componentDidMount() {
        if (!cookies.get('login')) {
            window.location.href = "/";
        }
    }
    selectedImages(e) {
        this.setState({
            images: e.target.files
        })
    }
    viewImages() {
        console.log(this.state.images)
    }
    sendImages() {
        if (!this.state.images) {
            alert("You must charge a image")
            return
        }
        const formdata = new FormData()

        for (let index = 0; index < this.state.images.length; index++) {
            formdata.append("images", this.state.images[index])
        }

        console.log('Imagenes subidas->' + this.state.images)

        fetch('http://localhost:3000/images/post', {
            method: 'POST',
            body: formdata

        })
            .then(res => res.text())
            .then(res => console.log(res))
            .catch(err => {
                console.log(err)
            })

    }
    render() {
        return (
            <div>
                <Nav></Nav>
                <div className={"home"}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10">
                                <h4 className="h4">Fotos</h4>
                            </div>
                            <div className="col-lg-2">
                                <div className="image-upload">
                                    <label for="file-input">
                                        <img className="img-cloud" src="/app/assets/icons/computacion-en-la-nube.png"/>
                                    </label>
                                    <input id="file-input" type={"file"} multiple className='form-control' onChange={this.selectedImages.bind(this)}></input>
                                    <input type="Button" id="reload" onClick={this.sendImages.bind(this)} defaultValue={"Upload Images"} className={"btn"} />
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <CardImages></CardImages>
                                        <CardImages></CardImages>
                                        <CardImages></CardImages>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Home;