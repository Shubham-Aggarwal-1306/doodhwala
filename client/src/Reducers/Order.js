import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    history: [],
    services: [],
    message: "",
    loading: false,
    error: null,
}


export const orderReducer = createReducer(initialState, (builder) => {

    builder
        .addCase("OrderHistoryRequest", (state) => {
            state.loading = true;
        })
        .addCase("OrderHistoryFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("OrderHistorySuccess", (state, action) => {
            state.loading = false;
            state.history = action.payload;
            state.error = null;
        })
        .addCase("ServicesSuccess", (state, action) => {
            state.loading = false;
            state.services = action.payload;
            state.error = null;
        })
        .addCase("ServicesRequest", (state) => {
            state.loading = true;
        })
        .addCase("ServicesFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("VacationRequest", (state) => {
            state.loading = true;
        })
        .addCase("VacationFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("VacationSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        })
        .addCase("OrderCreationRequest", (state) => {
            state.loading = true;
        })
        .addCase("OrderCreationFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("OrderCreationSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        })
        .addCase("ClearOrderError", (state) => {
            state.error = null;
        })
});