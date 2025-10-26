import { configureStore } from '@reduxjs/toolkit'
import compilerSlice from './slices/compilerSlice'
import themeSlice from './slices/themeSlice'

export const store = configureStore({
    reducer: {
        compilerSlice,
        themeSlice,
    },
})

export type StateType = ReturnType<typeof store.getState>;