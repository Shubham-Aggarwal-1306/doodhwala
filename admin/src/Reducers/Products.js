import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    products: [],
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
        .addCase("UpdateProductRequest", (state) => {
            state.loading = true;
        })
        .addCase("UpdateProductFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("UpdateProductSuccess", (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = null;
        })
        .addCase("CreateProductRequest", (state) => {
            state.loading = true;
        })
        .addCase("CreateProductFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("CreateProductSuccess", (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = null;
        })
        .addCase("DeleteProductRequest", (state) => {
            state.loading = true;
        })
        .addCase("DeleteProductFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("DeleteProductSuccess", (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = null;
        })
        .addCase("ClearProductError", (state) => {
            state.error = null;
        })
});