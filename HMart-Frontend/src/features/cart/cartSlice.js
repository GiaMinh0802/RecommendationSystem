import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService'

const initialState = {
    carts: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getCart = createAsyncThunk('cart/get-cart', async (thunkAPI) => {
    try {
        return await cartService.getCart()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToCart = createAsyncThunk('cart/add-to-cart', async (cartData, thunkAPI) => {
    try {
        return await cartService.addToCart(cartData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateCart = createAsyncThunk('cart/update-cart', async (cartData, thunkAPI) => {
    try {
        return await cartService.updateCart(cartData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const removeProductCart = createAsyncThunk('cart/remove-product-cart', async (idProd, thunkAPI) => {
    try {
        return await cartService.removeProductCart(idProd)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const removeCart = createAsyncThunk('cart/remove-cart', async (thunkAPI) => {
    try {
        return await cartService.removeCart()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const cartSlice = createSlice({
    name: "carts",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.carts = action.payload
            })
            .addCase(getCart.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.carts = action.payload
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(updateCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.carts = action.payload
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(removeProductCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeProductCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.carts = action.payload
            })
            .addCase(removeProductCart.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(removeCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.carts = action.payload
            })
            .addCase(removeCart.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
    }
})

export default cartSlice.reducer