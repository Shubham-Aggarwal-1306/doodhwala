import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    messsages: [],
    messsage: {},
    loading: false,
    error: null
}

export const messageReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("AllMessagesRequest", (state) => {
            state.loading = true;
        })
        .addCase("AllMessagesFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("AllMessagesSuccess", (state, action) => {
            state.loading = false;
            state.messages = action.payload;
            state.error = null;
        })
        .addCase("ClearErrors", (state) => {
            state.error = null;
        });
});
