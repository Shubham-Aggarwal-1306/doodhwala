import React from "react";
import Delivery from "../Delivery/Delivery";
import HowWeDoImg from "../../Assets/HowWeDo.svg";
import "./HowWeDo.css";

const HowWeDo = () => {
  return (
    <>
      <div className="how-we-do__hero">
        <div className="how-we-do__hero__title">How We Do</div>
        <div className="how-we-do__hero__breadcrumb">Home &gt; How We Do</div>
      </div>
      <div className="how-we-do__flow">
        <img src={HowWeDoImg} alt="How We Do" />
      </div>
      <div className="how-we-do__delivery">
        <Delivery />
      </div>
    </>
  );
};

export default HowWeDo;
