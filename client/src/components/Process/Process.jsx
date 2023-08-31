import React from "react";
import "./Process.css";
import Delivery from "../Delivery/Delivery";
import process1 from "../../Assets/process1.svg";
import process2 from "../../Assets/process2.svg";

const Process = () => {
  return (
    <>
      <div className="process__hero">
        <div className="process__hero__title">Our Process</div>
        <div className="process__hero__breadcrumb">Home &gt; Process</div>
      </div>
      <div className="process__chart">
        <div className="process__chart--title">Raw Milk</div>
        <div className="process__chart--flow">
          <img src={process1} alt="process1" />
        </div>
      </div>
      <div className="process__chart">
        <div className="process__chart--title">Pasteurize Milk</div>
        <div className="process__chart--flow">
          <img src={process2} alt="process2" />
        </div>
      </div>
      <div className="process__points">
        <div className="process__points--title">Our Process</div>
        <div className="process__points--description">
          Milk the way, it&#39;s meant to be. We follow a streamlined process end to
          end, to ensure that our customers receive the freshest and highest
          quality milk.
        </div>
        <div className="process__points--list">
          <div className="process__points--list--item--left">
            <div className="process__points--list--item--number">1</div>
            <div className="process__points--list--item--content">
              <div className="process__points--list--item--content--title">
                Sourcing from Local Producers
              </div>
              <div className="process__points--list--item--content--description">
                The local producers use ethical and sustainable farming
                practices for milk. We only work with the ones who prioritize
                the health and well-being of their cows,and who are committed to
                producing high-quality milk.
              </div>
            </div>
          </div>
          <div className="process__points--list--item--right">
            <div className="process__points--list--item--content">
              <div className="process__points--list--item--content--title">
                Testing & Quality Control
              </div>
              <div className="process__points--list--item--content--description">
                Throughout the entire process, we adhere to strict quality
                control measures to ensure that our milk is of purest form. Our
                team of experts test the milk for freshness and purity on a
                regular basis and make sure the quality is not compromised.
              </div>
            </div>
            <div className="process__points--list--item--number">2</div>
          </div>
          <div className="process__points--list--item--left">
            <div className="process__points--list--item--number">3</div>
            <div className="process__points--list--item--content">
              <div className="process__points--list--item--content--title">
                Packaging
              </div>
              <div className="process__points--list--item--content--description">
                Once the milk has been processed, it is packaged in glass
                bottles to maintain its freshness and taste. We use eco-friendly
                packaging materials to minimize our environmental impact.
              </div>
            </div>
          </div>
          <div className="process__points--list--item--right">
            <div className="process__points--list--item--content">
              <div className="process__points--list--item--content--title">
                Delivery
              </div>
              <div className="process__points--list--item--content--description">
                The milk is then loaded onto our delivery trucks and transported
                directly to our customers' doorsteps. We offer flexible delivery
                schedules and you can customize their orders to meet their
                specific needs.
              </div>
            </div>
            <div className="process__points--list--item--number">4</div>
          </div>
          <div className="process__points--list--item--left">
            <div className="process__points--list--item--number">5</div>
            <div className="process__points--list--item--content">
              <div className="process__points--list--item--content--title">
                Customer Service
              </div>
              <div className="process__points--list--item--content--description">
                We pride ourselves on our excellent customer service. Our team
                is always available to answer any questions or concerns that our
                customers may have. We are committed to providing a hassle-free,
                convenient service that meets the needs of our customers.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="process__delivery">
        <Delivery />
      </div>
    </>
  );
};

export default Process;
