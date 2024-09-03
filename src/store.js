import { configureStore } from '@reduxjs/toolkit'
import userauthReducer from './features/userSlice'
import packageReducer from './features/packageSlice'
export const store = configureStore({
  reducer: {
    userauth: userauthReducer,
    packageauth: packageReducer,
  },
})