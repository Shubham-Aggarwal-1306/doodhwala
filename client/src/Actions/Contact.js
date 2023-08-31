import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from "../firebase";
import { getIdToken } from 'firebase/auth';

export const sendMessage = (name, email, message) => async (dispatch) => {
    try {
        dispatch({ type: "ContactRequest" });
        let token;
        await getIdToken(auth.currentUser)
          .then((idToken) => {
            token = idToken;
          })
          .catch((error) => {
            dispatch({ type: "ContactRequest", payload: error.message });
            toast.error(error.message);
          });
        const order = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/contact/sendmessage`,
            { name, email, message },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch({ type: "ContactSuccess", payload: order.data.message });
        toast.success(order.data.message);
    }
    catch (error) {
        console.log(error);
        dispatch({ type: "ContactFailure", payload: error.response?.data.message });
        toast.error(error.response?.data.message);
    }
};

            