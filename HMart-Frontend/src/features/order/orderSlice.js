import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getOrder = createAsyncThunk('order/get-order', async (thunkAPI) => {
    try {
        return await orderService.getOrder()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createOrder = createAsyncThunk('order/create-order', async (orderData, thunkAPI) => {
    try {
        return await orderService.createOrder(orderData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createPayment = createAsyncThunk('order/create-payment', async (paymentData, thunkAPI) => {
    try {
        return await orderService.createPayment(paymentData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const returnPayment = createAsyncThunk('order/return-payment', async (query, thunkAPI) => {
    try {
        return await orderService.returnPayment(query)
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
            .addCase(getOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.orders = action.payload
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.orders = action.payload
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(createPayment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.payment = action.payload
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(returnPayment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(returnPayment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.status = action.payload
            })
            .addCase(returnPayment.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
    }
})

export default orderSlice.reducer