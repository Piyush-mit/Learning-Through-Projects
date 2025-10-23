import { configureStore } from '@reduxjs/toolkit'
import compilerSlice from './slices/compilerSlice'

export const store = configureStore({
  reducer: {
    compilerSlice
  },
})

export type StateType = ReturnType<typeof store.getState>;