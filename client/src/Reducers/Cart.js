import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    message: "",
    cart: [],
    promoData: null
}

export const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("GetCartRequest", (state) => {
            state.loading = true;
        })
        .addCase("GetCartFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("GetCartSuccess", (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            state.error = null;
        })
        .addCase("AddToCartRequest", (state) => {
            state.loading = true;
        })
        .addCase("AddToCartFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("AddToCartSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        })
        .addCase("RemoveFromCartRequest", (state) => {
            state.loading = true;
        })
        .addCase("RemoveFromCartFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("RemoveFromCartSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
            state.error = null;
        })
        .addCase("ApplyPromoCodeRequest", (state) => {
            state.loading = true;
        })
        .addCase("ApplyPromoCodeFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("ApplyPromoCodeSuccess", (state, action) => {
            state.loading = false;
            state.promoData = action.payload;
            state.error = null;
        })
        .addCase("RemovePromoCodeRequest", (state) => {
            state.loading = true;
        })
        .addCase("RemovePromoCodeFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("RemovePromoCodeSuccess", (state, action) => {
            state.loading = false;
            state.promoData = null;
            state.error = null;
        })
});