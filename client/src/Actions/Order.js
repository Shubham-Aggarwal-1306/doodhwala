import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from "../firebase";
import { getIdToken } from 'firebase/auth';
import { getCart } from './Cart';

export const createOrder = (phone, address) => async (dispatch) => {
    try {
        dispatch({ type: "OrderCreationRequest" });
        let token;
        await getIdToken(auth.currentUser)
            .then((idToken) => {
                token = idToken;
            })
            .catch((error) => {
                dispatch({ type: "OrderCreationFailure", payload: error.message });
                toast.error(error.message);
            });
        const orderCreation = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/order/checkout`,
            {
                phone,
                address,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "OrderCreationSuccess", payload: orderCreation.data.message });
        localStorage.removeItem("promo");
        toast.success(orderCreation.data.message);
        dispatch(getCart());
    }
    catch (error) {
        console.log(error);
        dispatch({ type: "OrderCreationFailure", payload: error.response?.data.message });
        toast.error(error.response?.data.message);
    }
}

export const getOrderHistory = () => async (dispatch) => {
    try {
        dispatch({ type: "OrderHistoryRequest" });
        let token;
        await getIdToken(auth.currentUser)
            .then((idToken) => {
                token = idToken;
            })
            .catch((error) => {
                dispatch({ type: "OrderHistoryFailure", payload: error.message });
                toast.error(error.message);
            });
        const orderHistory = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/order/userorders`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "OrderHistorySuccess", payload: orderHistory.data.data });
    }
    catch (error) {
        console.log(error);
        dispatch({ type: "OrderHistoryFailure", payload: error.response?.data.message });
        toast.error(error.response?.data.message);
    }
}

export const getServices = () => async (dispatch) => {
    try {
        dispatch({ type: "ServicesRequest" });
        let token;
        await getIdToken(auth.currentUser)
            .then((idToken) => {
                token = idToken;
            })
            .catch((error) => {
                dispatch({ type: "OrderHistoryFailure", payload: error.message });
                toast.error(error.message);
            });
        const services = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/order/activeservices`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "ServicesSuccess", payload: services.data.data });
    }
    catch (error) {
        console.log(error);
        dispatch({ type: "ServicesFailure", payload: error.response?.data.message });
        toast.error(error.response?.data.message);
    }
}

export const vacation = (subscribe_id, start_date, end_date) => async (dispatch) => {
    try {
        dispatch({ type: "VacationRequest" });
        let token;
        await getIdToken(auth.currentUser)
            .then((idToken) => {
                token = idToken;
            })
            .catch((error) => {
                dispatch({ type: "VacationFailure", payload: error.message });
                toast.error(error.message);
            });
        const vacation = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/order/vacation`,
            {
                subscribe_id,
                start_date,
                end_date,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "VacationSuccess", payload: vacation.data.message });
        toast.success(vacation.data.message);
        dispatch(getServices());
    }
    catch (error) {
        console.log(error);
        dispatch({ type: "VacationFailure", payload: error.response?.data.message });
        toast.error(error.response?.data.message);
    }
}