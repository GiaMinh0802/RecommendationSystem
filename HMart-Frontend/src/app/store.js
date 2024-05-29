import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import categoryReducer from '../features/category/categorySlice'
import productReducer from '../features/product/productSlice'
import cartReducer from '../features/cart/cartSlice'
import wishlistReducer from '../features/wishlist/wishlistSlice'
import orderReducer from '../features/order/orderSlice'
import ratingReducer from '../features/rating/ratingSlice'
import addressReducer from '../features/address/addressSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    rating: ratingReducer,
    address: addressReducer
  },
})
