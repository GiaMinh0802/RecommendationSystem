import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getProducts = createAsyncThunk('product/get-products', async (data, thunkAPI) => {
    try {
        return await productService.getProducts(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getProduct = createAsyncThunk('product/get-product', async (idProd, thunkAPI) => {
    try {
        return await productService.getProduct(idProd)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getProductsForRecommenders = createAsyncThunk('product/get-products-recommenders', async (thunkAPI) => {
    try {
        return await productService.getProductsForRecommenders()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const productSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.product = action.payload
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(getProductsForRecommenders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductsForRecommenders.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.productsRecommenders = action.payload
            })
            .addCase(getProductsForRecommenders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
    }
})

export default productSlice.reducer