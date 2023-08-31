import React from "react";
import "./MeetTeam.css";
import home3 from "../../Assets/home3.png";
import profileSample from "../../Assets/profileSample.jpg";
const MeetTeam = () => {
  return (
    <div className="meet-team">
      <div className="meet-team__description">
        <div className="meet-team__description--title">Meet Our Team</div>
        <div className="meet-team__description--text">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem.
        </div>
      </div>
      <div className="meet-team__image">
        <img src={home3} alt="home3" />
      </div>
      <div className="meet-team__members">
        <div className="meet-team__members--member">
          <img src={profileSample} alt="profileSample" />
        </div>
        <div className="meet-team__members--member">
          <img src={profileSample} alt="profileSample" />
        </div>
        <div className="meet-team__members--member">
          <img src={profileSample} alt="profileSample" />
        </div>
        <div className="meet-team__members--member">
          <img src={profileSample} alt="profileSample" />
        </div>
      </div>
    </div>
  );
};

export default MeetTeam;
