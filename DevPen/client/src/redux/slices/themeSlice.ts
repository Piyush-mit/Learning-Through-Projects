import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState: {
        value: 'githubDark',
        auth: false,
    },
    reducers: {
        changeTheme: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        changeAuth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload;
        }
    }
})

export default themeSlice.reducer;
export const { changeTheme, changeAuth } = themeSlice.actions;