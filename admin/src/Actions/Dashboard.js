import axios from 'axios';
import { toast } from 'react-toastify';

const token = localStorage.getItem('accessToken');

const dataCreator = async (data) => {

    const labels = Object.keys(data.data);
    const values = Object.values(data.data);

    const chartData = {
        labels: labels,
        data: values
    };

    return chartData;
}


export const getRevenueMonthly = () => async (dispatch) => {
    try {

        dispatch({ type: "RevenueMonthlyRequest" })

        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/wallet/stats?type=months`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const chartData = await dataCreator(data);

        dispatch({
            type: "RevenueMonthlySuccess",
            payload: chartData
        })

    } catch (error) {
        dispatch({
            type: "RevenueMonthlyFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}

export const getRevenueYearly = () => async (dispatch) => {
    try {
        dispatch({ type: "RevenueYearlyRequest" })

        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/wallet/stats?type=years`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const chartData = await dataCreator(data);

        dispatch({
            type: "RevenueYearlySuccess",
            payload: chartData
        })

    } catch (error) {
        dispatch({
            type: "RevenueYearlyFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}

export const getOrderStats = () => async (dispatch) => {
    try {
        dispatch({ type: "OrderStatsRequest" })

        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/order/stats`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: "OrderStatsSuccess",
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: "OrderStatsFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}

export const getUserStats = () => async (dispatch) => {
    try {
        dispatch({ type: "UserStatsRequest" })

        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/stats`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: "UserStatsSuccess",
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: "UserStatsFailure",
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}