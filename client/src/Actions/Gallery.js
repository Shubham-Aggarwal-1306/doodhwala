import axios from 'axios';
import { toast } from 'react-toastify';

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
