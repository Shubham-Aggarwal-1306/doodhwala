import React from 'react';
import './SideBar.css';
import Call from '../../Assets/Icons/Call.svg';
import cart from '../../Assets/Icons/cartMain.svg';
import Whatsapp from '../../Assets/Icons/Whatsapp.svg';
import Wallet from '../../Assets/Icons/wallet.svg';
import Links from '../../config/Links';

const SideBar = () => {
    const handleCall = () => {
        window.open(Links.Call);
    }
    const handleWhatsapp = () => {
        window.open(Links.Whatsapp);
    }
    const handleCart = () => {
        window.location.href = '/checkout';
    }
    const handleWallet = () => {
        window.location.href = '/profile';
    }
    return (
        <div className='side-bar'>
            <div className='side-bar__item' onClick={handleCall} >
                <div className='side-bar__item--icon'>
                    <img src={Call} alt='Call' />
                </div>
                <div className='side-bar__item--text'>
                    Call Us
                </div>
            </div>
            <div className='side-bar__item' onClick={handleWhatsapp}>
                <div className='side-bar__item--icon'>
                    <img src={Whatsapp} alt="Whatsapp" />
                </div>
                <div className='side-bar__item--text'>
                    Whatsapp
                </div>
            </div>
            <div className='side-bar__item' onClick={handleCart}>
                <div className='side-bar__item--icon'>
                    <img src={cart} alt="cart"/>
                </div>
                <div className='side-bar__item--text'>
                    Checkout
                </div>
            </div>
            <div className='side-bar__item' onClick={handleWallet}>
                <div className='side-bar__item--icon'>
                    <img src={Wallet} alt="cart"/>
                </div>
                <div className='side-bar__item--text'>
                    Wallet
                </div>
            </div>
        </div>
    )
}

export default SideBar;
