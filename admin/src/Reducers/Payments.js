import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    payments: [],
    payment: {},
    loading: false,
    error: null
}

export const paymentReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("AllPaymentsRequest", (state) => {
            state.loading = true;
        })
        .addCase("AllPaymentsFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("AllPaymentsSuccess", (state, action) => {
            state.loading = false;
            state.payments = action.payload;
            state.error = null;
        })
        .addCase("PaymentDetailsRequest", (state) => {
            state.loading = true;
        })
        .addCase("PaymentDetailsFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("PaymentDetailsSuccess", (state, action) => {
            state.loading = false;
            state.payment = action.payload;
            state.error = null;
        })
        .addCase("ClearErrors", (state) => {
            state.error = null;
        });
});
