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

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

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
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.createdUser = action.payload
                if (state.isSuccess === true) {
                    toast.success("Tạo tài khoản thành công")
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error("Thông tin không hợp lệ!")
                }
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
                if (state.isSuccess === true) {
                    localStorage.setItem("accessToken", action.payload.accessToken)
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
                state.message = action.error.message
                if (state.isError === true) {
                    toast.error("Thông tin không chính xác!")
                }
            })
    }
})

export default authSlice.reducer