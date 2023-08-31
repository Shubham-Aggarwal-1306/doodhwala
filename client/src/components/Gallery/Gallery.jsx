import React, { useEffect } from "react";
import "./Gallery.css";
import GalleryImage from "./GalleryImage";
import { galleryImages } from "../../Actions/Gallery";

import { useDispatch, useSelector } from "react-redux";

const Gallery = () => {
  const dispatch = useDispatch();
  const { loading, images } = useSelector((state) => state.galleryReducer);
  useEffect(() => {
    dispatch(galleryImages());
  }, [dispatch]);

  return loading ? (
    <div className="loading">
      <div className="loading__circle"></div>
    </div>
  ) : (
    <>
      <div className="gallery">
        <div className="gallery__hero">
        </div>
        <div className="gallery__images">
          <div className="gallery__headtext">
            <div>Gallery</div>
          </div>
          <div className="gallery__maintext">
            <div> Check Out Our Gallery</div>
          </div>
          <div className="gallery__imagecards">
            {images.map((image) => {
              return <GalleryImage key={image._id} image={image} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
