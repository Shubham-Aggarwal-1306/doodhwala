import React, { useEffect } from "react";
import { Image, Modal } from "antd";
import "./Gallery.css";

import { galleryImages, deleteGalleryImage } from "../../Actions/Gallery";
import { useDispatch, useSelector } from "react-redux";

const Gallery = () => {
  const dispatch = useDispatch();

  const { images } = useSelector((state) => state.galleryReducer);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [imageId, setProductId] = React.useState("");

  const handleDelete = () => {
    dispatch(deleteGalleryImage(imageId));
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(galleryImages());
  }, [dispatch]);

  return (
    <>
      <div className="products">
        <div className="header">
          <div className="heading">Gallery Images</div>
          <div className="header__button">
            <button onClick={() => (window.location.href = "/gallery/add")}>
              Add Images<span>+</span>
            </button>
          </div>
        </div>
        <div className="images">
          {images.map((image) => {
            return (
              <div className="image" key={image._id}>
                <Image
                  key={image._id}
                  width={200}
                  height={150}
                  src={image.image}
                  preview={{
                    src: image.image,
                  }}
                />
                <div
                  className="delete"
                  onClick={() => {
                    setIsModalOpen(true);
                    setProductId(image._id);
                  }}
                >
                  <button>&#10006;</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        title="Delete Image"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => {
          setIsModalOpen(false);
          setProductId("");
        }}
      >
        <p>Do you want to proceed deleting this image?</p>
      </Modal>
    </>
  );
};

export default Gallery;
