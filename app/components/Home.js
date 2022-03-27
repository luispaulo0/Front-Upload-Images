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
            images: [],
            savedImages: [],
            userid: cookies.get('iduser')
        }

        this.token = false,
        this.images = []
        this.getImages()

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
    getImages() {
        console.log(this.state.userid)
        APIInvoker.invokeGET(`/images/getimages/${this.state.userid}`,
            data => {
                console.log(data.data)
                this.setState({
                    savedImages: data.data
                })
            },
            error => {
                console.log(error)
            })
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
        formdata.append("userid", this.state.userid)

        console.log(this.state.images)

        fetch('http://localhost:3000/images/post', {
            method: 'POST',
            body: formdata
        })
            .then(res => res.text())
            .then(
                res => console.log(res),
                this.getImages()
            )
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
                            <input id="file-input" type={"file"} multiple className='form-control' onChange={this.selectedImages.bind(this)}></input>
                            <input type="Button" id="reload" onClick={this.sendImages.bind(this)} defaultValue={"Upload Images"} className={"btn"} />
                            <input type="Button" id="update" onClick={this.getImages.bind(this)} defaultValue={"Update"} className={"btn"} />
                            <div className="container d-flex justify-content-center">
                                <For each="item" index="idx" of={this.state.savedImages}>
                                    <div className='card' key={idx}>
                                        <img src={'http://localhost:3000/' + item}></img>
                                    </div>
                                </For>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Home;