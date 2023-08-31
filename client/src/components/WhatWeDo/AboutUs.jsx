import React from "react";
import "./AboutUs.css";
import aboutUs from "../../Assets/aboutUs.svg";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-us__left">
        <div className="about-us__left--title">About Us</div>
        <div className="about-us__left--text">
          Milk is the staple of every household. And when you consume it on a
          daily basis, it’s not a choice but a necessity to get fresh, pure and
          unadulterated milk. In the fast paced world today, when most of us are
          busy working & managing life, we give little or no importance to the
          kind of milk we are consuming and its level of purity too. You simply
          go to the stores and get cartons and packets of milk and consume till
          it runs out. And Repeat the cycle.
          <br />
          <br />
          We at Apka Doodhwala, understand your busy lifestyle and thereby
          bringing unprocessed milk in its purest form- to you. You don’t even
          have to worry about stepping out- it gets delivered to you wherever
          you want. Purity delivered at your doorstep. So now, when you have
          that slab of fresh cheese or your kids have a glass of milk in the
          morning- you’d want to have some more.
        </div>
      </div>
      <div className="about-us__right">
        <img src={aboutUs} alt="about us" />
      </div>
    </div>
  );
};

export default AboutUs;
