import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from "../firebase";
import { getIdToken } from 'firebase/auth';

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'AllProductsRequest' });
        let response;
        if (auth.currentUser) {
            let idToken;
            await getIdToken(auth.currentUser).then( (Token) => {
                idToken = Token;
            }).catch((error) => {
                dispatch({ type: 'AllProductsFailure', payload: error.message });
                toast.error(error.message);
            });
            response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product/getAllProducts`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`
                }
            });

        } else {
            response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product/getAllProducts`);
        }
        dispatch({ type: 'AllProductsSuccess', payload: response.data.data });

    } catch (error) {
        dispatch({
            type: 'AllProductsFailure',
            payload: error.response?.data.message
        })
        toast.error(error.response?.data.message);
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'ProductDetailsRequest' });
        let response;
        if (auth.currentUser) {
            let idToken;
            await getIdToken(auth.currentUser).then( (Token) => {
                idToken = Token;
            }).catch((error) => {
                dispatch({ type: 'AllProductsFailure', payload: error.message });
                toast.error(error.message);
            });
            response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`
                }
            });
        } else {
            response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product/${id}`);
        }

        dispatch({ type: 'ProductDetailsSuccess', payload: response.data.data[0] });

    } catch (error) {
        dispatch({
            type: 'ProductDetailsFailure',
            payload: error.response?.data.message
        })
        toast.error(error.response?.data.message);
    }
}

export const getProductByCategory = (category) => async (dispatch) => {
    try {
        dispatch({ type: 'ProductByCategoryRequest' });
        let response;
        if (auth.currentUser) {
            let idToken;
            await getIdToken(auth.currentUser).then( (Token) => {
                idToken = Token;
            }).catch((error) => {
                dispatch({ type: 'AllProductsFailure', payload: error.message });
                toast.error(error.message);
            });
            response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product/?category=${category}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`
                }
            });
        } else {
            response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/product/?category=${category}`);
        }

        dispatch({ type: 'ProductByCategorySuccess', payload: response.data.data });

    } catch (error) {
        dispatch({
            type: 'ProductByCategoryFailure',
            payload: error.response?.data.message
        })
        toast.error(error.response?.data.message);
    }
}


