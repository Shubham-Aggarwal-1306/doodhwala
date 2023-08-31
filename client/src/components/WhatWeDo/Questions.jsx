import React from "react";
import feature1 from "../../Assets/feature1.svg";
import feature2 from "../../Assets/feature2.svg";
import feature3 from "../../Assets/feature3.svg";
import local from "../../Assets/local.svg";
import client from "../../Assets/client.svg";
import "./Questions.css";
import ContentBox from "./ContentBox";

const Questions = () => {
  return (
    <div className="questions">
      <div className="question__container">
        <div className="question__left--title">What We Do?</div>
        <div className="question">
          <div className="question__left one">
            <ContentBox
              quote={
                "We deliver fresh,100% natural, organic milk & milk products  A bunch of honest, hardworking, and ready-to-serve persons together aim to provide fresh natural milk to everyone. We aim to make people taste & realize again the importance of natural fresh milk."
              }
            />
          </div>
          <div className="question__right">
            <div className="question__right--features">
              <div className="question__right--features--item">
                <div className="question__right--features--item--icon">
                  <img src={feature1} alt="feature1" />
                </div>
                <div className="question__right--features--item--text">
                  100% natural Organic & Milk Product
                </div>
              </div>
              <div className="question__right--features--item">
                <div className="question__right--features--item--icon">
                  <img src={feature2} alt="feature2" />
                </div>
                <div className="question__right--features--item--text">
                  Honest, Hardworking. and ready to serve delivery person
                </div>
              </div>
              <div className="question__right--features--item">
                <div className="question__right--features--item--icon">
                  <img src={feature3} alt="feature3" />
                </div>
                <div className="question__right--features--item--text">
                  100% natural Organic & Milk Product
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="question__container">
        <div className="question__right--title">Why We Do?</div>
        <div className="question two">
          <div className="question__left two">
            <div className="question__left--local">
              <div className="question__left--local--image">
                <img src={local} alt="local" />
              </div>
              <div className="question__left--local--text">
                Local Producer Image
              </div>
            </div>
            <div className="question__left--local">
              <div className="question__left--local--image">
                <img src={client} alt="local" />
              </div>
              <div className="question__left--local--text">Our Customer</div>
            </div>
          </div>
          <div className="question__right two">
            <ContentBox
              quote={
                "We aim to support local producers as we know we can't find more honest, humble & innocent people than our local producers & that’s the reason they are continuously being exploited by the giant milk corporations in terms, of milk standards, low pricing, fake milk reports, etc. We help our producer in every way possible, by providing excellent pricing, transparent and true milk reports, and no other means of exploitation. We promise our customers, fresh organic, 100% unadulterated milk directly to the doorstep of the consumer. Consumers can directly order via our website."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
