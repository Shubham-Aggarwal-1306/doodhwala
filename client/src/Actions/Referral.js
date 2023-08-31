import axios from 'axios';
import { toast } from 'react-toastify';

import { auth } from "../firebase";
import { getIdToken } from "firebase/auth";

export const getUserReferral = () => async (dispatch) => {
    try {
        dispatch({ type: "ReferralRequest" })
        let token;
        await getIdToken(auth.currentUser)
            .then((idToken) => {
                token = idToken;
            })
            .catch((error) => {
                dispatch({ type: "ReferralFailure", payload: error.message });
                toast.error(error.message);
            });
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/coupon/referralcode`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });
        dispatch({
            type: "ReferralSuccess",
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type: "ReferralFailure",
            payload: error.response?.data.message,
        });
        toast.error(error.response?.data.message);
    }
}
