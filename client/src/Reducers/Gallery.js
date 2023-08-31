import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    images: [],
    loading: false,
    error: null
}

export const galleryReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("GalleryImagesRequest", (state) => {
            state.loading = true;
        })
        .addCase("GalleryImagesFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("GalleryImagesSuccess", (state, action) => {
            state.loading = false;
            state.images = action.payload;
            state.error = null;
        })
});