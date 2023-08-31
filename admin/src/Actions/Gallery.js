import axios from 'axios';
import { toast } from 'react-toastify';

const token = localStorage.getItem("accessToken");

export const galleryImages = () => async (dispatch) => {
    try {
        dispatch({ type: "GalleryImagesRequest" })
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/gallery/get`);
        dispatch({
            type: "GalleryImagesSuccess",
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: "GalleryImagesFailure",
            payload: error.response?.data.message,
        });
        toast.error(error.response?.data.message);
    }
}

export const newImages = (galleryImages) => async (dispatch) => {
    try {
      dispatch({ type: "AddImageRequest" });
      const images = galleryImages?.images?.fileList;
      const cloudinaryImages = [];
      for (const element of images) {
        const formData = new FormData();
        formData.append("file", element.originFileObj);
        formData.append("upload_preset", "doodhwala");
        formData.append("folder", "gallery");
        formData.append("cloud_name", "dn2jk5smj");
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/dn2jk5smj/image/upload`,
          formData
        );
        cloudinaryImages.push(data.secure_url);
      }
      const uploadedImages = cloudinaryImages;
      const details = {
        images: uploadedImages,
      };
      console.log(details);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/gallery/add`,
        details,
        config
      );

      dispatch({
        type: "AddImageSuccess",
        payload: data,
      });
      toast.success("Images added successfully");
      window.location.href = "/gallery";
    } catch (error) {
      dispatch({
        type: "AddImageFailure",
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
  };

export const deleteGalleryImage = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DeleteImageRequest" });
        const { data } = await axios.delete(
            `${process.env.REACT_APP_SERVER_URL}/gallery/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({
            type: "DeleteImageSuccess",
            payload: data.success,
        });
        dispatch(galleryImages());
        toast.success("Image deleted successfully.");
    } catch (error) {
        dispatch({
            type: "DeleteImageFailure",
            payload: error.response.data.message,
        });
        toast.error(error.response.data.message);
    }
};
