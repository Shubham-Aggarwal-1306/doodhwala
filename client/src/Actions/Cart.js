import axios from 'axios';
import { getIdToken } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { getAllProducts, getProductByCategory, getProductDetails } from './Product';

export const getCart = () => async (dispatch) => {
    try {
        dispatch({ type: 'GetCartRequest' });
        let token;
        await getIdToken(auth.currentUser).then((idToken) => {
            token = idToken;
        }).catch((error) => {
            dispatch({ type: 'WalletCheckoutFailure', payload: error.message });
            toast.error(error.message);
        });
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/cart/get`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: 'GetCartSuccess',
            payload: response.data.data
        });
    } catch (error) {
        dispatch({
            type: 'GetCartFailure',
            payload: error.response?.data.message
        })
        if (error.response?.data.message !== "Cart not found.") {
            toast.error(error.response?.data.message);
        }
    }
}

export const addToCart = (id, qty, type, setOpen) => async (dispatch) => {
    try {
        if (!auth.currentUser) {
            return toast.error("Please Login First");
        }
        dispatch({ type: 'AddToCartRequest' });
        let token;
        await getIdToken(auth.currentUser).then((idToken) => {
            token = idToken;
        }).catch((error) => {
            dispatch({ type: 'AddToCartFailure', payload: error.message });
            toast.error(error.message);
        });
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/cart/add`, {
            product_id: id,
            quantity: qty,
            order_type: type
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        dispatch({
            type: 'AddToCartSuccess',
            payload: response.data.data
        });
        
        toast.success("Added to Cart");
        setOpen(false);
        dispatch(getAllProducts());
        dispatch(getProductByCategory("Dairy"));
        dispatch(getProductDetails(id));
        dispatch(getCart());
    } catch (error) {
        dispatch({
            type: 'AddToCartFailure',
            payload: error.response?.data.message
        })
        setOpen(false);
        toast.error(error.response?.data.message);
    }
}


export const removeFromCart = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'RemoveFromCartRequest' });
        let token;
        await getIdToken(auth.currentUser).then((idToken) => {
            token = idToken;
        }).catch((error) => {
            dispatch({ type: 'RemoveFromCartFailure', payload: error.message });
            toast.error(error.message);
        });

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/cart/remove`, { product_id: id }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch({
            type: 'RemoveFromCartSuccess',
            payload: response.data.data
        });
        toast.success("Removed from Cart");
        dispatch(getAllProducts());
        dispatch(getProductByCategory("Dairy"));
        dispatch(getProductDetails(id));
        dispatch(getCart());
    } catch (error) {
        dispatch({
            type: 'RemoveFromCartFailure',
            payload: error.response?.data.message
        })
        toast.error(error.response?.data.message);
    }
}


export const applyPromoCode = (code, id) => async (dispatch) => {   
    try {
        dispatch({ type: 'ApplyPromoCodeRequest' });
        let token;
        await getIdToken(auth.currentUser).then((idToken) => {
            token = idToken;
        }).catch((error) => {
            dispatch({ type: 'ApplyPromoCodeFailure', payload: error.message });
            toast.error(error.message);
        });

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/coupon/apply`, { coupon_code: code, cartID: id }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: 'ApplyPromoCodeSuccess',
            payload: response.data.data
        });
        localStorage.setItem("promo", code)
        toast.success("Promo Code Applied");
        dispatch(getCart());

    } catch (error) {
        dispatch({
            type: 'ApplyPromoCodeFailure',
            payload: error.response?.data.message
        })
        toast.error(error.response?.data.message);
    }
}

export const removePromoCode = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'RemovePromoCodeRequest' });
        let token;
        await getIdToken(auth.currentUser).then((idToken) => {
            token = idToken;
        }).catch((error) => {
            dispatch({ type: 'RemovePromoCodeFailure', payload: error.message });
            toast.error(error.message);
        });

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/coupon/remove`, {coupon_code: localStorage.getItem("promo"),cartID: id}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        localStorage.removeItem("promo");
        dispatch({
            type: 'RemovePromoCodeSuccess',
            payload: response.data.data
        });
        toast.success("Promo Code Removed");
        dispatch(getCart());

    } catch (error) {
        dispatch({
            type: 'RemovePromoCodeFailure',
            payload: error.response?.data.message
        })
        toast.error(error.response?.data.message);
    }
}

