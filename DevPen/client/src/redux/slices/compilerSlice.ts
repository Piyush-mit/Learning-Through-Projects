import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface CompilerStateType {
    fullCode: {
        html: string
        css: string
        javascript: string
    }
    currentLanguage: "html" | "css" | "javascript"
}

export const htmlBase = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>DevPen</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="card">
        <h1>Welcome to DevPen</h1>
        <button id="btn">Count <span id="count">0</span></button>
    </div>
  </body>
</html>
`;

export const cssBase = `* {
  margin: 0;
  padding: 0;
}
body {
  height: 100vh;
  widows: 100vw;
  display: grid;
  place-items: center;
  background: #0d1117;
  color: rgb(229 231 235);
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, sans-serif;
}
.card {
  width: 100vw;
  display: grid;
  place-items: center;
}
h1 { margin: 0 0 20px; font-weight: 700; letter-spacing: 0.3px; }
#btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgb(229 231 235);
  color: black;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
  font-weight: 300;
}
#btn:hover { transform: translateY(-1px); background: rgb(229,231,235,0.9); }
#btn:active { transform: translateY(0); }
#count { font-variant-numeric: tabular-nums; font-weight: 700; }`;

export const javascriptBase = `const btn = document.getElementById("btn");
const countEl = document.getElementById("count");

let n = 0;
btn.addEventListener("click", () => {
  n++;
  countEl.textContent = String(n);
});
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "r") {
    n = 0;
    countEl.textContent = "0";
  }
});
`

const initialState: CompilerStateType = {
    fullCode: {
        html: htmlBase,
        css: cssBase,
        javascript: javascriptBase
    },
    currentLanguage: 'html',
}

const compilerSlice = createSlice({
    name: 'compilerSlice',
    initialState,
    reducers: {
        updateCurrentLanguage: (state, action: PayloadAction<CompilerStateType['currentLanguage']>) => {
            state.currentLanguage = action.payload;
        },
        updateCode: (state, action: PayloadAction<string>) => {
            state.fullCode[state.currentLanguage] = action.payload;
        },
    }
})

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updateCode } = compilerSlice.actions;