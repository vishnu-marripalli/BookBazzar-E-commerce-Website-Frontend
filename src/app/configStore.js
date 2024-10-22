import { configureStore } from '@reduxjs/toolkit'
import featureReducer from '../features/features'
import cartReducer  from '../features/cart'
import userReducer from '../features/auth/index'

export const store = configureStore({
  reducer: {
    user:userReducer,
    features:featureReducer,
    cart:cartReducer
  },
})