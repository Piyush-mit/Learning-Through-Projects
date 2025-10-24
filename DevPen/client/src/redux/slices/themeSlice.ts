import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState: {
        value : 'githubDark'
    },
    reducers: {
        changeTheme: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
})

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;