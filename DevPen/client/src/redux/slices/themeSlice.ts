import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CompilerStateType } from "./compilerSlice";
export interface UserCode {
    _id: string;
    title: string;
    fullCode: CompilerStateType["fullCode"];
}
interface ThemeState {
    value: string;
    auth: boolean;
    user: {
        username: string;
        email: string;
        codes: UserCode[];
    };
}

export const initialThemeState: ThemeState = {
    value: 'githubDark',
    auth: false,
    user: {
        username: 'username',
        email: '@',
        codes: []
    }
};
const themeSlice = createSlice({
    name: 'themeSlice',
    initialState: initialThemeState,
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
            codes: UserCode[]
        }>) => {
            state.user = action.payload;
        },
        updateUserCodes: (state, action: PayloadAction<string>) => {
            state.user.codes.filter(code => code._id != action.payload);
        }
    }
})

export default themeSlice.reducer;
export const { changeTheme, changeAuth, updateUser, updateUserCodes } = themeSlice.actions;