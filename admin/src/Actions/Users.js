import axios from 'axios';
import { toast } from 'react-toastify';

const token = localStorage.getItem('accessToken');

export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: "AllUsersRequest" })

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getAllUsers`, config);
        dispatch({
            type: "AllUsersSuccess",
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: "AllUsersFailure",
            payload: error.response.data.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: "UserDetailsRequest" })

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${id}`, config);
        dispatch({
            type: "UserDetailsSuccess",
            payload: data?.data
        })
    } catch (error) {
        dispatch({
            type: "UserDetailsFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}