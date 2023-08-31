import React from 'react';
import './HomeHero.css';
import feature1 from '../../Assets/feature1.svg';
import feature2 from '../../Assets/feature2.svg';
import feature3 from '../../Assets/feature3.svg';
import home1 from '../../Assets/home1.png';

const HomeHero = () => {
    return (
        <div className='home-hero'>
            <div className='home-hero__left'>
                <div className='home-hero__left--title'>
                    <span className='home-hero__left--title--one'>100%</span>
                    <span className='home-hero__left--title--two'> Pure <br/>
                        & Fresh Milk</span>
                </div>
                <div className='home-hero__left--description'>
                    The freshest milk in town, delivered right to you
                </div>
                <div className='home-hero__left--button'>
                    <a href="/product">Book Trial</a>
                </div>
                <div className='home-hero__left--features'>
                    <div className='home-hero__left--features--item'>
                        <div className='home-hero__left--features--item--icon'>
                            <img src={feature1} alt='feature1' />
                        </div>
                        <div className='home-hero__left--features--item--text'>
                            100% natural Organic & Milk Product
                        </div>
                    </div>
                    <div className='home-hero__left--features--item'>
                        <div className='home-hero__left--features--item--icon'>
                            <img src={feature2} alt='feature2' />
                        </div>
                        <div className='home-hero__left--features--item--text'>
                            Honest, Hardworking. and
                            ready to serve delivery
                            person
                        </div>
                    </div>
                    <div className='home-hero__left--features--item'>
                        <div className='home-hero__left--features--item--icon'>
                            <img src={feature3} alt='feature3' />
                        </div>
                        <div className='home-hero__left--features--item--text'>
                            100% natural Organic & Milk Product
                        </div>
                    </div>
                </div>
            </div>
            <div className='home-hero__right'>
                <div className='home-hero__right--image'>
                    <img src={home1} alt='home1' />
                </div>
                <div className='home-hero__right--buttons'>
                    <button className='home-hero__right--buttons--button1'>Book Trial</button>
                    <button className='home-hero__right--buttons--button2'>GET VIP Membership</button>
                    <button className='home-hero__right--buttons--button3'>Subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default HomeHero
