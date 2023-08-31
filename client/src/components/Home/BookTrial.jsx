import React from "react";
import "./BookTrial.css";

const BookTrial = () => {
  return (
    <div className="book-trial">
      <div className="book-trial__title">
        Curious to try our locally sourced
        <br />
        FRESH MILK?
      </div>
      <div className="book-trial__button">
        <a href="/product">Book Trial</a>
      </div>
    </div>
  );
};

export default BookTrial;
