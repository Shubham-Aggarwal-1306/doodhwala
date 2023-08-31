import React from "react";
import "./GalleryImage.css";

const galleryImage = ({ image }) => {
  return (
    <>
      <div className="gallery-image">
        <img src={image?.image} alt="gallery_image" />
      </div>
    </>
  );
};

export default galleryImage;
