import { useCallback, useState } from "react";
import ThemeSelect, { type ThemeKey } from "./EditorThemeSelect";
import LanguageSelect from "./EditorLanguageSelect";
import CodeMirror, { type Extension } from "@uiw/react-codemirror";
import {
    githubDark,
    githubLight,
    dracula,
    atomone,
    materialDark,
    materialLight,
} from "@uiw/codemirror-themes-all";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { Button } from "./ui/button";
import { CopyIcon, SaveIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { StateType } from "@/redux/store";

export default function CodeEditor() {
    const [value, setValue] = useState("");
    const [themeKey, setThemeKey] = useState<ThemeKey>("githubDark");
    const currentLanguage = useSelector((state: StateType) => state.compilerSlice.currentLanguage);
    const dispatch = useDispatch();

    // Editor
    const onChange = useCallback((val: string) => setValue(val), []);
    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(value);
            toast.success("Copied to clipboard");
        } catch (err) {
            console.error("Copy failed", err);
            toast.error("Copy to clipboard failed");
        }
    }
    async function handleSave() {
        try {
            toast.success("Saved successfully");
        } catch (error) {
            toast.error("Saving failed");
        }
    }

    // Themes
    let currentTheme: any = githubDark;
    if (themeKey === "githubDark") currentTheme = githubDark;
    else if (themeKey === "githubLight") currentTheme = githubLight;
    else if (themeKey === "dracula") currentTheme = dracula;
    else if (themeKey === "atomone") currentTheme = atomone;
    else if (themeKey === "materialDark") currentTheme = materialDark;
    else if (themeKey === "materialLight") currentTheme = materialLight;

    let language: Extension[] = [html()];

    if (currentLanguage === "css") language = [css()];
    else if (currentLanguage === "javascript") language = [javascript({ jsx: true, typescript: true })];

    return (
        <div className="flex h-screen flex-col">
            {/* Editor options */}
            <div className=" flex justify-between items-center px-2">
                {/* selects */}
                <div className="flex gap-2 h-full items-center">
                    <ThemeSelect value={themeKey} onChange={(val) => setThemeKey(val)} />
                    <LanguageSelect />
                </div>

                {/* buttons */}
                <div className="p-2 flex gap-2 h-full items-center">
                    <Button variant={'custom'} size={"sm"} onClick={handleSave}><SaveIcon /></Button>
                    <Button variant={'custom'} size={"sm"} onClick={handleCopy}><CopyIcon /></Button>
                </div>
            </div>

            <div className="flex-1">
                <CodeMirror
                    value={value}
                    height="100vh"
                    extensions={language}
                    theme={currentTheme}
                    onChange={onChange}
                    placeholder={"Welcome to Devpen"}
                />
            </div>
        </div>
    );
}