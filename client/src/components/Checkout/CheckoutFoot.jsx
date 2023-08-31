import React from 'react'
import './CheckoutFoot.css';
import badge from '../../Assets/Icons/badge.svg';
import secure from '../../Assets/Icons/secure.svg';
import caller from '../../Assets/Icons/caller.svg';

const CheckoutFoot = () => {
    return (
        <div className='checkout-foot'>
            <div className='checkout-foot__icon'>
                <div className='checkout-foot__icon--img'>
                    <img src={badge} alt='badge' />
                </div>
                <div className='checkout-foot__icon--heading'>
                    100% Natural
                </div>
                <div className='checkout-foot__icon--text'>
                    Good for your health and quality
                    guaranteed
                </div>
            </div>
            <div className='checkout-foot__icon'>
                <div className='checkout-foot__icon--img'>
                    <img src={secure} alt='secure' />
                </div>
                <div className='checkout-foot__icon--heading'>
                    Safe and quality
                </div>
                <div className='checkout-foot__icon--text'>
                    The best quality with the best
                    traditional ingredients
                </div>
            </div>
            <div className='checkout-foot__icon'>
                <div className='checkout-foot__icon--img'>
                    <img src={caller} alt='caller' />
                </div>
                <div className='checkout-foot__icon--heading'>
                    Online Support
                </div>
                <div className='checkout-foot__icon--text'>
                    Online complaint service for 24 hours
                    without stopping
                </div>
            </div>
        </div>
    )
}

export default CheckoutFoot
