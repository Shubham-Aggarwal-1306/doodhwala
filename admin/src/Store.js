import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from './Reducers/Auth';
import { couponReducer } from './Reducers/Coupons';
import { orderReducer } from './Reducers/Orders';
import { paymentReducer } from './Reducers/Payments';
import { productReducer } from './Reducers/Products';
import { userReducer } from './Reducers/Users';
import { messageReducer } from './Reducers/Messages';
import { dashboardReducer } from './Reducers/Dashboard';
import { galleryReducer } from './Reducers/Gallery';

const store = configureStore({
    reducer: {
        authReducer: authReducer,
        userReducer: userReducer,
        productReducer: productReducer,
        paymentReducer: paymentReducer,
        orderReducer: orderReducer,
        couponReducer: couponReducer,
        messageReducer: messageReducer,
        dashboardReducer: dashboardReducer,
        galleryReducer: galleryReducer
    },
});

export default store;