import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    images: [],
    addImage: [],
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
        .addCase("DeleteImageRequest", (state) => {
            state.loading = true;
        })
        .addCase("DeleteImageFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("DeleteImageSuccess", (state, action) => {
            state.loading = false;
            state.addImage = action.payload;
            state.error = null;
        })
        .addCase("AddImageRequest", (state) => {
            state.loading = true;
        })
        .addCase("AddImageFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("AddImageSuccess", (state, action) => {
            state.loading = false;
            state.addImage = action.payload;
            state.error = null;
        })
});