import axios from "axios";
import { toast } from "react-toastify";
import Icon from "../Assets/Icon.png";
import { auth } from "../firebase";
import { getIdToken } from "firebase/auth";

export const walletCheckout =
  (amount, Razorpay, name, email, phone, description = "") =>
    async (dispatch) => {
      try {
        dispatch({ type: "WalletCheckoutRequest" });
        let token;
        await getIdToken(auth.currentUser)
          .then((idToken) => {
            token = idToken;
          })
          .catch((error) => {
            dispatch({ type: "WalletCheckoutFailure", payload: error.message });
            toast.error(error.message);
          });
        const order = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/wallet/checkout`,
          { amount },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch({ type: "WalletCheckoutSuccess", payload: order.data.data.id });

        dispatch({ type: "WalletAddRequest" });

        const options = {
          key: `${process.env.REACT_APP_RAZORPAY_KEY}`,
          amount: order.data.data.amount,
          currency: "INR",
          name: "AapkaDudhwala",
          description: description,
          image: Icon,
          order_id: order.data.data.id,
          handler: async function (response) {
            try {
              const result = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/wallet/userverification`,
                response,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              dispatch({ type: "WalletAddSuccess", payload: result.data.data });
              toast.success("Payment Successful");
              dispatch(walletBalance());
              dispatch(walletHistory());;
            } catch (error) {
              console.log(error);
              dispatch({
                type: "WalletAddFailure",
                payload: error.response?.data.message,
              });
              dispatch(walletBalance());
              dispatch(walletHistory());
              toast.error(error.response?.data.message);
            }
          },
          modal: {
            ondismiss: async function () {
              try {
                await axios.post(
                  `${process.env.REACT_APP_SERVER_URL}/wallet/canceltransaction`,
                  {
                    razorpay_order_id: order.data.data.id,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                dispatch({
                  type: "WalletAddFailure",
                  payload: "Payment Cancelled",
                });
                dispatch(walletBalance());
                dispatch(walletHistory());
                toast.error("Payment Cancelled");
              } catch (error) {
                console.log(error);
                dispatch({
                  type: "WalletAddFailure",
                  payload: error.response?.data.message,
                });
                dispatch(walletBalance());
                dispatch(walletHistory());
                toast.error(error.response?.data.message);
              }
            },
          },
          prefill: {
            name: name,
            email: email,
            contact: phone,
          },
          notes: {
            Details:
              "Aapka Dudhwala, Call us - 18005720711, Email - support@apnadoodhwala.com",
          },
          theme: {
            color: "white",
          },
        };
        const razor = new Razorpay(options);
        razor.open();

        razor.on("payment.failed", function (response) {
          dispatch({
            type: "WalletAddFailure",
            payload: response.error.description,
          });
          dispatch(walletBalance());
          dispatch(walletHistory());
          toast.error(response.error.description);
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: "WalletCheckoutFailure",
          payload: error.response?.data.message,
        });
        dispatch(walletBalance());
        dispatch(walletHistory());
        toast.error(error.response?.data.message);
      }
    };

export const walletBalance = () => async (dispatch) => {
  try {
    dispatch({ type: "WalletBalanceRequest" });
    let token;
    await getIdToken(auth.currentUser)
      .then((idToken) => {
        token = idToken;
      })
      .catch((error) => {
        dispatch({ type: "WalletBalanceFailure", payload: error.message });
        toast.error(error.message);
      });
    const balance = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/wallet/getbalance`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "WalletBalanceSuccess", payload: balance.data.data });
  }
  catch (error) {
    console.log(error);
    dispatch({
      type: "WalletBalanceFailure",
      payload: error.response?.data.message,
    });
    toast.error(error.response?.data.message);
  }
};

export const walletHistory = () => async (dispatch) => {
  try {
    dispatch({ type: "WalletHistoryRequest" });
    let token;
    await getIdToken(auth.currentUser)
      .then((idToken) => {
        token = idToken;
      })
      .catch((error) => {
        dispatch({ type: "WalletHistoryFailure", payload: error.message });
        toast.error(error.message);
      });
    const history = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/wallet/transactionhistory`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "WalletHistorySuccess", payload: history.data.data });
  }
  catch (error) {
    console.log(error);
    dispatch({
      type: "WalletHistoryFailure",
      payload: error.response?.data.message,
    });
    toast.error(error.response?.data.message);
  }
}