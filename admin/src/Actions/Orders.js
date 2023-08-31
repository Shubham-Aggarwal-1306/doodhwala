import axios from 'axios';
import { toast } from 'react-toastify';

const token = localStorage.getItem('accessToken');

export const getOrders = (type) => async (dispatch) => {
    try {

        dispatch({ type: "AllOrdersRequest" })

        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/order?type=${type}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: "AllOrdersSuccess",
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: "AllOrdersFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: "OrderDetailsRequest" });

        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/order/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: "OrderDetailsSuccess",
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: "OrderDetailsFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}

export const acceptOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: "AcceptOrderRequest" });

        const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/order/approve/${id}`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: "AcceptOrderSuccess",
            payload: data.success
        })
        toast.success("Order accepted successfully")
        dispatch(getOrderDetails(id));
    } catch (error) {
        dispatch({
            type: "AcceptOrderFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}

export const declineOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DeclineOrderRequest" });

        const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/order/cancel/${id}`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: "DeclineOrderSuccess",
            payload: data.success
        })
        dispatch(getOrderDetails(id));
        toast.success("Order declined successfully")
    } catch (error) {
        dispatch({
            type: "DeclineOrderFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}
