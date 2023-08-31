import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    loading: false,
    isAuthenticated: false,
    error: null
}

export const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("LoginRequest", (state) => {
            state.loading = true;
        })
        .addCase("LoginSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase("LoginFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("LoadUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("LoadUserSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase("LoadUserFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("ClearErrors", (state) => {
            state.error = null;
        })
        .addCase("Logout", (state) => {
            state.isAuthenticated = false;
            state.user = {};
        });
});