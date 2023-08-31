import React, { useState } from 'react'
import "./HeaderMain.css";
import Icon from "../../Assets/Icon.png";
import profileSample from "../../Assets/profileSample.jpg";
import { useSelector } from 'react-redux';
import HeaderMobileMenu from './HeaderMobileMenu';

const HeaderMain = () => {
  const { user, loading } = useSelector(state => state.userReducer);
  return (
    <>
      {/* Desktop Header */}
      <div className="header-main">
        <div className="header-main__icon">
          <img src={Icon} alt="icon" onClick={() => window.location.href = '/'} />
        </div>
        <div className="header-main__menu">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <div className="dropdown">
                <button className="dropbtn">About Us
                  <div className="dropdown-arrow">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.83042 3.73817L6.57564 0.67081C6.77886 0.443015 7.10744 0.443015 7.31066 0.67081C7.40794 0.779008 7.4627 0.926591 7.4627 1.08052C7.4627 1.23445 7.40794 1.38204 7.31066 1.49023L4.19847 4.96788C3.99502 5.19496 3.6669 5.19496 3.46345 4.96788L0.351265 1.49038C0.253981 1.38204 0.199219 1.23445 0.199219 1.08052C0.199219 0.926591 0.253981 0.779008 0.351265 0.670665C0.554645 0.443304 0.882994 0.443448 1.08628 0.670954L3.83042 3.73817Z" fill="#809FB8" />
                    </svg>

                  </div>
                </button>
                <div className="dropdown-content">
                  <a href="/howwedo">How We Do</a>
                  <a href="/whatwedo">What We Do</a>
                </div>
              </div>
            </li>
            <li>
              <a href="/gallery">Gallery</a>
            </li>
            <li>
              <a href="/product">Product</a>
            </li>
            <li>
              <a href="/process">Process</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="header-main__profile">
          <a href="/product" className='header-main__profile--button'>Book Trial</a>
          {loading ? (
            <div className="loaderButton">
              <div className="loader"></div>
            </div>
          ) : user ? (
            <a href="/profile">
              <img src={user?.photoUrl ? user?.photoUrl : user?.profileImage || profileSample} alt="profile" />
            </a>) : (
            <a href="/login" className='header-main__profile--button'>
              Login
            </a>)}
        </div>
      </div>
      {/* Cover the space taken by header */}
      <div className="header-main__cover"></div>

      {/* Mobile Header */}
      <div className="header-main__mobile">
        <div className="header-main__mobile--nav">
          <div className="header-main__mobile--icon">
            <img src={Icon} alt="icon" onClick={() => window.location.href = '/'} />
          </div>
          <div className="header-main__mobile--profile">
            {loading ? (
              <div className="loaderButton">
                <div className="loader"></div>
              </div>
            ) : user ? (
              <a href="/profile">
                <img src={(user.photoUrl) ? (user.photoUrl) : (profileSample)} alt="profile" />
              </a>) : (
              <a href="/login" className='header-main__mobile--profile--button'>
                Login
              </a>)}
          </div>
        </div>
      </div>
      <div className="header-main__mobile--menu">
        <HeaderMobileMenu />
      </div>
    </>
  );
}

export default HeaderMain;