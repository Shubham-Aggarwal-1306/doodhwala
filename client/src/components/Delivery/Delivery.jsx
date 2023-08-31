import React from 'react'
import home2 from '../../Assets/home2.png';
import './Delivery.css';
const Delivery = () => {
    return (
        <div className="delivery">
            <div className="delivery__container">
                <div className="delivery__container--content">
                    <div className="delivery__container--title">
                        Door Step Your life Delivery
                    </div>
                    <div className="delivery__container--description">
                        Moo-ve over the packets & cartons.<br/>
                        Try our milk that’s so fresh, you can taste the difference
                    </div>
                    <div className="delivery__container--button">
                        <a href="/product">Book Trial</a>
                    </div>
                </div>
                <div className="delivery__container--image">
                    <img src={home2} alt="home2" />
                </div>
            </div>
        </div>
    )
}

export default Delivery
