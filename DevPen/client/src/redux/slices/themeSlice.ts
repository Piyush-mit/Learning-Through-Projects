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
        allCodes: UserCode[];
    };
}

export const initialThemeState: ThemeState = {
    value: 'githubDark',
    auth: false,
    user: {
        username: 'username',
        email: '@',
        codes: [],
        allCodes: []
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
            state.user = {
                ...action.payload,
                allCodes: action.payload.codes
            };

        },
        updateUserCodes: (state, action: PayloadAction<string>) => {
            state.user.codes = state.user.codes.filter(code => code._id != action.payload);
        },
        filterCodes: (state, action: PayloadAction<string>) => {
            const searchTerm = action.payload.toLowerCase();
            if (searchTerm === "") {
                // reset when input cleared
                state.user.codes = state.user.allCodes;
            } else {
                state.user.codes = state.user.allCodes.filter(code =>
                    code.title.toLowerCase().includes(searchTerm)
                );
            }
        }
    }
})

export default themeSlice.reducer;
export const { changeTheme, changeAuth, updateUser, updateUserCodes, filterCodes } = themeSlice.actions;