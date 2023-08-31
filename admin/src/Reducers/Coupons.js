import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    coupons: [],
    coupon: {},
    loading: false,
    error: null
}

export const couponReducer = createReducer(initialState, (builder) => {

    builder
        .addCase("AllCouponsRequest", (state) => {
            state.loading = true;
        })
        .addCase("AllCouponsFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("AllCouponsSuccess", (state, action) => {
            state.loading = false;
            state.coupons = action.payload;
            state.error = null;
        })
        .addCase("CouponDetailsRequest", (state) => {
            state.loading = true;
        })
        .addCase("CouponDetailsFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("CouponDetailsSuccess", (state, action) => {
            state.loading = false;
            state.coupon = action.payload;
            state.error = null;
        })
        .addCase("UpdateCouponRequest", (state) => {
            state.loading = true;
        })
        .addCase("UpdateCouponFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("UpdateCouponSuccess", (state, action) => {
            state.loading = false;
            state.coupon = action.payload;
            state.error = null;
        })
        .addCase("CreateCouponRequest", (state) => {
            state.loading = true;
        })
        .addCase("CreateCouponFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("CreateCouponSuccess", (state, action) => {
            state.loading = false;
            state.coupon = action.payload;
            state.error = null;
        })
        .addCase("ClearCouponError", (state) => {
            state.error = null;
        })
});