import React from 'react'
import "../Styles/Home.css"
import Nav from "./Nav"
import APIInvoker from "../utils/APIInvoker";
import Cookies from "universal-cookie";
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
        } else {
            const formdata = new FormData();
            const file = this.state.images[0]
            const data = formdata.append('image', file);

            APIInvoker.invokePOST('/images/upload', data, data => {
                console.log(data);
            }, error => {
                console.log(error);
            })
        }
    }
    render() {
        return (
            <div className={"home"}>
                <Nav></Nav>
                {/* <img className={"imagenLogo"} src="app/assets/images/logo5.png" /> */}
                <div className="card w-50">
                    <img src="https://th.bing.com/th/id/OIP.yU5l_okkZykKXNdssMxUdQHaHa?pid=ImgDet&rs=1" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Subir imagen</h5>

                    <form action="/stats" enctype="multipart/form-data" method="post">
                        <div class="form-group">
                            <input type="file" class="form-control-file" name="uploaded_file" />
                            <input type="text" class="form-control" placeholder="Number of speakers" name="nspeakers" />
                            <input type="submit" value="Get me the stats!" class="btn btn-default" />
                        </div>
                    </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default Home;