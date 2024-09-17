import { configureStore } from '@reduxjs/toolkit'
import featureReducer from '../features/features'
import cartReducer  from '../features/cart'

export const store = configureStore({
  reducer: {
    features:featureReducer,
    cart:cartReducer
  },
})