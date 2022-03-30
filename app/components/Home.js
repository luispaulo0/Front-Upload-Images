import React from 'react'
import "../Styles/Home.css"
import Nav from "./Nav"
import APIInvoker from "../utils/APIInvoker";
import Cookies from "universal-cookie";
import CardImages from "./CardImages";
import Header from "./Header";
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
                <Header></Header>
                <div className="home vh-color">
                    <div className="container ">
                        <div className="row">
                            <div className="col-lg-2 ">
                            </div>
                            <div className="col-lg-10 resent-color border-start">
                                <h4 className="h4">Recientes</h4>
                                <div className="image-upload">
                                    <label htmlFor="file-input">
                                        <img src="/app/assets/icons/computacion-en-la-nube.png" className="img-cloud"/>
                                    </label>
                                    <input id="file-input" type={"file"} multiple className='form-control ' onChange={this.selectedImages.bind(this)}></input>
                                </div>
                                <input type="Button" id="reload" onClick={this.sendImages.bind(this)} defaultValue={"Subir"} className="btn update"/>

                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1">

                            </div>
                            <div className="col-lg-1">

                            </div>
                            <div className="col-lg-10 resent-color border-start" >
                                <div className="image-upload">
                                    <label htmlFor="update">
                                        <img src="/app/assets/icons/refresh%20(1).png" className="reload"/>
                                    </label>
                                    <input type="Button" id="update" onClick={this.getImages.bind(this)} defaultValue={"Subir"}  />
                                </div>
                                <div className="overflow-auto" id="over-photos">
                                    <For each="item" index="idx" of={this.state.savedImages}>
                                        <div className='card img-size-up' key={idx}>
                                            <img src={'http://localhost:3000/' + item} className="img-size"></img>
                                        </div>
                                    </For>
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