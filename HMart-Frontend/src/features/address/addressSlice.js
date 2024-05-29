import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import addressService from './addressService'

const initialState = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const getProvinces = createAsyncThunk('address/get-province', async (thunkAPI) => {
    try {
        return await addressService.getProvinces()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getDistricts = createAsyncThunk('address/get-district', async (idProvince, thunkAPI) => {
    try {
        return await addressService.getDistricts(idProvince)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getWards = createAsyncThunk('address/get-ward', async (data, thunkAPI) => {
    try {
        return await addressService.getWards(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addressSlice = createSlice({
    name: "addresses",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProvinces.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProvinces.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.provinces = action.payload
            })
            .addCase(getProvinces.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(getDistricts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDistricts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.districts = action.payload
            })
            .addCase(getDistricts.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
            .addCase(getWards.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getWards.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.wards = action.payload
            })
            .addCase(getWards.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
            })
    }
})

export default addressSlice.reducer