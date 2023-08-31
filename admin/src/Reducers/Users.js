import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    user: {},
    loading: false,
    error: null
}

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("AllUsersRequest", (state) => {
            state.loading = true;
        })
        .addCase("AllUsersFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("AllUsersSuccess", (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = null;
        })
        .addCase("UserDetailsRequest", (state) => {
            state.loading = true;
        })
        .addCase("UserDetailsFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("UserDetailsSuccess", (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase("ClearErrors", (state) => {
            state.error = null;
        });
});