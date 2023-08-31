import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    referral: [],
    loading: false,
    error: null
}

export const referralReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("ReferralRequest", (state) => {
            state.loading = true;
        })
        .addCase("ReferralFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("ReferralSuccess", (state, action) => {
            state.loading = false;
            state.referral = action.payload;
            state.error = null;
        })
});