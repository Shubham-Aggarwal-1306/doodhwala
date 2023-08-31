import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    productsByCategory: [],
    product: {},
    loading: false,
    error: null
}


export const productReducer = createReducer(initialState, (builder) => {

    builder
        .addCase("AllProductsRequest", (state) => {
            state.loading = true;
        })
        .addCase("AllProductsFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("AllProductsSuccess", (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = null;
        })
        .addCase("ProductDetailsRequest", (state) => {
            state.loading = true;
        })
        .addCase("ProductDetailsFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("ProductDetailsSuccess", (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = null;
        })
        .addCase("ProductByCategoryRequest", (state) => {
            state.loading = true;
        })
        .addCase("ProductByCategoryFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("ProductByCategorySuccess", (state, action) => {
            state.loading = false;
            state.productsByCategory = action.payload;
            state.error = null;
        })
        .addCase("ClearProductError", (state) => {
            state.error = null;
        })
});

