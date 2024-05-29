import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ratingService from './ratingService'

const initialState = {
    ratings: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getRating = createAsyncThunk('rating/get-rating', async (idProd, thunkAPI) => {
    try {
        return await ratingService.getRating(idProd)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const ratingProduct = createAsyncThunk('rating/rating-product', async (ratingData, thunkAPI) => {
    try {
        return await ratingService.ratingProduct(ratingData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const ratingSlice = createSlice({
    name: "ratings",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRating.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRating.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.ratings = action.payload
            })
            .addCase(getRating.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(ratingProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(ratingProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.ratings = action.payload
            })
            .addCase(ratingProduct.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
    }
})

export default ratingSlice.reducer