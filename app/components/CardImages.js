import React from 'react'
import "../Styles/CardImages.css"

class CardImages extends React.Component{
    render() {
        return(
            <div className="card img-size-card" >
                <img src="/app/assets/images/prueba.jpg" className="card-img-top " />
            </div>
        )
    }
}

export default CardImages;