import { createReducer } from "@reduxjs/toolkit";

const initialState = { 
    order_id: "",
    balance: 0,
    history: [],
    loading: false,
    error: null,
    message: "",
}


export const walletReducer = createReducer(initialState, (builder) => {

    builder
        .addCase("WalletCheckoutRequest", (state) => {
            state.loading = true;
        })
        .addCase("WalletCheckoutFailure", (state, action) => {
            state.loading = false;
            state.order_id = "";
            state.error = action.payload;
        })
        .addCase("WalletCheckoutSuccess", (state, action) => {
            state.loading = false;
            state.order_id = action.payload;
            state.error = null;
        })

        .addCase("WalletAddRequest", (state) => {
            state.loading = true;
        })
        .addCase("WalletAddFailure", (state, action) => {
            state.loading = false;
            state.order_id = "";
            state.error = action.payload;
        })
        .addCase("WalletAddSuccess", (state, action) => {
            state.loading = false;
            state.order_id = "";
            state.message = action.payload;
            state.success = true;
            state.error = null;
        })
        .addCase("WalletBalanceRequest", (state) => {
            state.loading = true;
        })
        .addCase("WalletBalanceFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("WalletBalanceSuccess", (state, action) => {
            state.loading = false;
            state.balance = action.payload;
            state.error = null;
        })
        .addCase("WalletHistoryRequest", (state) => {
            state.loading = true;
        })
        .addCase("WalletHistoryFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("WalletHistorySuccess", (state, action) => {
            state.loading = false;
            state.history = action.payload;
            state.error = null;
        })
        .addCase("WalletReset", (state) => {
            state.loading = false;
            state.order_id = "";
            state.message = "";
            state.success = false;
            state.error = null;
        })
});