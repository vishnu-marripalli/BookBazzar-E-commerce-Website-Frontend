import { configureStore } from '@reduxjs/toolkit'
import featureReducer from '../features/features'

export const store = configureStore({
  reducer: {
    features:featureReducer,
  },
})