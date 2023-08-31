import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    message: "",
}

export const contactReducer = createReducer(initialState, (builder) => {
    
        builder
            .addCase("ContactRequest", (state) => {
                state.loading = true;
            })
            .addCase("ContactFailure", (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase("ContactSuccess", (state, action) => {
                state.loading = false;
                state.message = action.payload;
                state.error = null;
            })
            .addCase("ClearContactError", (state) => {
                state.error = null;
            })
    }
);