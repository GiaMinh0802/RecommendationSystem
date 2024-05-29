import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import { toast } from 'react-toastify'

const getUserfromLocalStorage = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')) 
    : null

const initialState = {
    user: getUserfromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.message = "success"
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                state.isLoading = false
                if (state.isError === true) {
                    toast.error("Thông tin không chính xác!")
                }
            })
    }
})

export default authSlice.reducer