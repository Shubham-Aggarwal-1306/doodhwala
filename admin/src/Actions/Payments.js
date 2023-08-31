import axios from 'axios';
import { toast } from 'react-toastify';

const token = localStorage.getItem('accessToken');

export const getPayments = () => async (dispatch) => {
    try {
        dispatch({ type: "AllPaymentsRequest" })

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/wallet/alltransaction`, config);
        dispatch({
            type: "AllPaymentsSuccess",
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: "AllPaymentsFailure",
            payload: error.response.data.message
        })
    }
}