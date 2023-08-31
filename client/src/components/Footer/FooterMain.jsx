import React from "react";
import "./FooterMain.css";
import whiteIcon from "../../Assets/whiteIcon.png";

const FooterMain = () => {
  return (
    <div className="footer-main">
      <div className="footer-main__description">
        <div className="footer-main__description--icon">
          <img src={whiteIcon} alt="logo" />
        </div>
        <div className="footer-main__description--text">
          Every single day, we at Happy Nature endeavour to provide you and your
          family with the healthiest, tastiest and freshest milk produced in a
          cruelty – free, hygienic and modern dairy farm. With each drop that
          you drink, you fall in love with milk all over again!
        </div>
      </div>
      <div className="footer-main__links">
        <div className="footer-main--title">Useful Links</div>
        <div className="footer-main__links--list">
          <div className="footer-main__links--list--item">
            <a href="/">Home</a>
          </div>
          <div className="footer-main__links--list--item">
            <a href="/whatwedo">About</a>
          </div>
          <div className="footer-main__links--list--item">
            <a href="/whatwedo">What We Do</a>
          </div>
          <div className="footer-main__links--list--item">
            <a href="/howwedo">How We Do</a>
          </div>
          <div className="footer-main__links--list--item">
            <a href="/gallery">Gallery</a>
          </div>
        </div>
      </div>
      <div className="footer-main__links">
        <div className="footer-main--title">Useful Links</div>
        <div className="footer-main__links--list">
          <div className="footer-main__links--list--item">
            <a href="/product">Product</a>
          </div>
          <div className="footer-main__links--list--item">
            <a href="/process">Process</a>
          </div>
          <div className="footer-main__links--list--item">
            <a href="/product">Book a Trial</a>
          </div>
        </div>
      </div>
      <div className="footer-main__contact">
        <div className="footer-main--title">
          <a href="/contact">Contact Info</a>
        </div>
        <div className="footer-main__contact--list">
          <div className="footer-main__contact--list--item">
            Call us - 18005720711
          </div>
          <div className="footer-main__contact--list--item">
            Email - support@apnadoodhwala.com
          </div>
        </div>
        <div className="footer-main--download">Download APP</div>
      </div>
    </div>
  );
};

export default FooterMain;
