import React from "react";
import "./WhatWeDo.css";
import MeetOurTeam from "./MeetOurTeam";
import AboutUs from "./AboutUs";
import WhoWeAre from "./WhoWeAre";
import Questions from "./Questions";
import FeaturesOfOrdering from "./FeaturesOfOrdering";
const WhatWeDo = () => {
  return (
    <>
      <div className="what-we-do__hero">
        <div className="what-we-do__hero__title">What We Do</div>
        <div className="what-we-do__hero__breadcrumb">Home &gt; What We Do</div>
      </div>
      <AboutUs />
      <Questions />
      <WhoWeAre />
      <FeaturesOfOrdering />
      <MeetOurTeam />
    </>
  );
};

export default WhatWeDo;
