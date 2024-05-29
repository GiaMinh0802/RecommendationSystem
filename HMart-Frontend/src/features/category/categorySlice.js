import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import categoryService from './categoryService'

const initialState = {
    categories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getCategories = createAsyncThunk('category/get-categories', async (thunkAPI) => {
    try {
        return await categoryService.getCategories()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const categorySlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.categories = action.payload
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
    }
})

export default categorySlice.reducer