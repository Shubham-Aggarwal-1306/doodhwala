import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    order: {},
    loading: false,
    error: null
}

export const orderReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("AllOrdersRequest", (state) => {
            state.loading = true;
        })
        .addCase("AllOrdersFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("AllOrdersSuccess", (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.error = null;
        })
        .addCase("OrderDetailsRequest", (state) => {
            state.loading = true;
        })
        .addCase("OrderDetailsFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("OrderDetailsSuccess", (state, action) => {
            state.loading = false;
            state.order = action.payload;
            state.error = null;
        })
        .addCase("AcceptOrderRequest", (state, action) => {
            state.loading = true;
        })
        .addCase("AcceptOrderFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("AcceptOrderSuccess", (state, action) => {
            state.loading = false;
            state.order = action.payload;
            state.error = null;
        })
        .addCase("DeclineOrderRequest", (state, action) => {
            state.loading = true;
        })
        .addCase("DeclineOrderFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("DeclineOrderSuccess", (state, action) => {
            state.loading = false;
            state.order = action.payload;
            state.error = null;
        })
        .addCase("ClearErrors", (state) => {
            state.error = null;
        });
});
