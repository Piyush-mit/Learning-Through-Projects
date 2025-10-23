import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CompilerStateType {
    html: string,
    css: string,
    javascript: string,
    currentLanguage: "html" | "css" | "javascript"
}


const initialState : CompilerStateType = {
    html: "",
    css: "",
    javascript: "",
    currentLanguage: 'html'
}

const compilerSlice = createSlice({
    name: 'compilerSlice',
    initialState,
    reducers: {
        updateCurrentLanguage: (state, action : PayloadAction<CompilerStateType['currentLanguage']>) => {
            state.currentLanguage = action.payload;
        }

    }
})

export default compilerSlice.reducer;
export const { updateCurrentLanguage } = compilerSlice.actions;