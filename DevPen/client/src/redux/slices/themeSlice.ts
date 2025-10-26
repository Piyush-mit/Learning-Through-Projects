import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState: {
        value: 'githubDark',
        auth: false,
        user: {
            username: 'User',
            email: 'johndoe@gmail.com',
        },
    },
    reducers: {
        changeTheme: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        changeAuth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload;
        },
        updateUser: (state, action: PayloadAction<{ 
            username: string, 
            email: string,
        }>) => {
            state.user = action.payload;
        }
    }
})

export default themeSlice.reducer;
export const { changeTheme, changeAuth, updateUser } = themeSlice.actions;