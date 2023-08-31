import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    revenueMonthly: {},
    revenueYearly: {},
    orderStats: {},
    userStats: {},
    loading: false,
    revenueMonthlyLoading: false,
    revenueYearlyLoading: false,
    orderStatsLoading: false,
    userStatsLoading: false,
    error: null
}

export const dashboardReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("RevenueMonthlyRequest", (state) => {
            state.revenueMonthlyLoading = true;
        })
        .addCase("RevenueMonthlyFailure", (state, action) => {
            state.revenueMonthlyLoading = false;
            state.error = action.payload;
        })
        .addCase("RevenueMonthlySuccess", (state, action) => {
            state.revenueMonthlyLoading = false;
            state.revenueMonthly = action.payload;
            state.error = null;
        })
        .addCase("RevenueYearlyRequest", (state) => {
            state.revenueYearlyLoading = true;
        })
        .addCase("RevenueYearlyFailure", (state, action) => {
            state.revenueYearlyLoading = false;
            state.error = action.payload;
        })
        .addCase("RevenueYearlySuccess", (state, action) => {
            state.revenueYearlyLoading = false;
            state.revenueYearly = action.payload;
            state.error = null;
        })
        .addCase("OrderStatsRequest", (state) => {
            state.orderStatsLoading = true;
        })
        .addCase("OrderStatsFailure", (state, action) => {
            state.orderStatsLoading = false;
            state.error = action.payload;
        })
        .addCase("OrderStatsSuccess", (state, action) => {
            state.orderStatsLoading = false;
            state.orderStats = action.payload;
            state.error = null;
        })
        .addCase("UserStatsRequest", (state) => {   
            state.userStatsLoading = true;
        })
        .addCase("UserStatsFailure", (state, action) => {
            state.userStatsLoading = false;
            state.error = action.payload;
        })
        .addCase("UserStatsSuccess", (state, action) => {
            state.userStatsLoading = false;
            state.userStats = action.payload;
            state.error = null;
        })
});
