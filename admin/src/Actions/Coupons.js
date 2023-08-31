import axios from 'axios';
import { toast } from 'react-toastify';

const token = localStorage.getItem('accessToken');

export const getCoupons = () => async (dispatch) => {
    try {

        dispatch({ type: "AllCouponsRequest" })

        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/coupon/all`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        dispatch({
            type: "AllCouponsSuccess",
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: "AllCouponsFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}

export const getCouponDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: "CouponDetailsRequest" })

        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/coupon/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        dispatch({
            type: "CouponDetailsSuccess",
            payload: data.coupon
        })
        toast.success("Coupon loaded successfully")
    } catch (error) {
        dispatch({
            type: "CouponDetailsFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}

export const newCoupon = (couponData) => async (dispatch) => {
    try {
        dispatch({ type: "CreateCouponRequest" });

        const config = {
            
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/coupon/generate`, couponData, config);

        dispatch({
            type: "CreateCouponSuccess",
            payload: data
        })
        dispatch(getCoupons())
        window.location.href = "/coupons"
        toast.success("Coupon created successfully")
    } catch (error) {
        dispatch({
            type: "CreateCouponFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}

export const updateCoupon = (id, couponData) => async (dispatch) => {   
    try {
        dispatch({ type: "UpdateCouponRequest" });

        const config = {
            
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }
        
        const { data } = await axios.put(`${process.env.REACT_APP_SERVER_URL}/coupon/${id}`, couponData, config);

        dispatch({
            type: "UpdateCouponSuccess",
            payload: data
        })
        dispatch(getCoupons())
        toast.success("Coupon updated successfully")
    } catch (error) {
        dispatch({
            type: "UpdateCouponFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}

export const deleteCoupon = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DeleteCouponRequest" });

        const config = {
            
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        const { data } = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/coupon/delete/${id}`, config);

        dispatch({
            type: "DeleteCouponSuccess",
            payload: data
        })
        dispatch(getCoupons());
        toast.success("Coupon deleted successfully")
    } catch (error) {
        dispatch({
            type: "DeleteCouponFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}


