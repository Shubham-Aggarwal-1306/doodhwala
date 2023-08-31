import axios from 'axios';
import { toast } from 'react-toastify';

const token = localStorage.getItem('accessToken');

export const getMessages = () => async (dispatch) => {
    try {

        dispatch({ type: "AllMessagesRequest" })

        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/contact/getall`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log(data)
        dispatch({
            type: "AllMessagesSuccess",
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: "AllMessagesFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}