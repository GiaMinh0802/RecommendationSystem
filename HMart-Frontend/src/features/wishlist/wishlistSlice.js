import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import wishlistService from './wishlistService'

const initialState = {
    wishlists: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getWishlist = createAsyncThunk('wishlist/get-wishlist', async (thunkAPI) => {
    try {
        return await wishlistService.getWishlist()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToWishlist = createAsyncThunk('wishlist/add-to-wishlist', async (wishlistData, thunkAPI) => {
    try {
        return await wishlistService.addToWishlist(wishlistData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const wishlistSlice = createSlice({
    name: "wishlists",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWishlist.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.wishlists = action.payload
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.wishlists = action.payload
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
    }
})

export default wishlistSlice.reducer