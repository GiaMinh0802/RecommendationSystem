import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
    orders: [],
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getOrders = createAsyncThunk('order/get-orders', async (thunkAPI) => {
    try {
        return await orderService.getOrders()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getStatistics = createAsyncThunk('order/get-statistics', async (thunkAPI) => {
    try {
        return await orderService.getStatistics()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrder = createAsyncThunk("order/get-order", async (id, thunkAPI) => {
    try {
        return await orderService.getOrderById(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const orderSlice = createSlice({
    name: "orders",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.orders = action.payload
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(getOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.orders = action.payload
                state.products = action.payload.orderItems
                state.message = "success"
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                state.isLoading = false
            })
            .addCase(getStatistics.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getStatistics.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.statistics = action.payload
            })
            .addCase(getStatistics.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                state.isLoading = false
            })
    }
})

export default orderSlice.reducer