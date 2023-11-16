import React from 'react'
// import { Link } from 'react-router-dom'

function Carousel() {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img className="d-block m-5 w-100" style={{height: '600px' }} src="https://freerangestock.com/sample/140597/pizza-on-dark-table-top-background--with-copyspace.jpg" alt="First slide" />
            </div>
            <div className="carousel-item">
                <img className="d-block w-100" style={{height: '600px' }} src="https://www.restaurantpizzeriarimini.com/menutouch/img/carousel-2.jpg" alt="Second slide" />
            </div>
            <div className="carousel-item">
                <img className="d-block w-100" style={{height: '600px' }} src="https://i.ytimg.com/vi/AdRQkL0KvDk/mqdefault.jpg" alt="Third slide" />
            </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
    </div>

    )
}

export default Carousel


