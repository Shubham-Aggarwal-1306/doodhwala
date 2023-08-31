import React from "react";
import "./ContentBox.css";

const ContentBox = ({ quote }) => {
  return (
    <div className="contentBox">
      <div className="contentBox__quotestart">“</div>
      <div className="contentBox__quote">{quote}</div>
      <div className="contentBox__quoteend">”</div>
    </div>
  );
};

export default ContentBox;
