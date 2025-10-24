import { useCallback, useMemo, useState } from "react";
import ThemeSelect from "./EditorThemeSelect";
import LanguageSelect from "./EditorLanguageSelect";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@uiw/react-codemirror";
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
import { CopyIcon, Loader2, SaveIcon, Share2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { StateType } from "@/redux/store";
import { updateCode } from "@/redux/slices/compilerSlice";
import { handleCopy, handleSave, handleShare } from "@/actions/compiler.action";
import { useNavigate, useParams } from "react-router-dom";

export default function CodeEditor({ theme: themeKey }: { theme: string }) {
    const fullCode = useSelector((state: StateType) => state.compilerSlice.fullCode);
    const currentLanguage = useSelector((state: StateType) => state.compilerSlice.currentLanguage);
    const [saving, setSaving] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { urlId } = useParams();
    const onChange = useCallback((value: string) => {
        dispatch(updateCode(value));
    }, [dispatch]);

    const currentTheme = useMemo(() => {
        switch (themeKey) {
            case "githubLight": return githubLight;
            case "dracula": return dracula;
            case "atomone": return atomone;
            case "materialDark": return materialDark;
            case "materialLight": return materialLight;
            default: return githubDark;
        }
    }, [themeKey]);

    const language = useMemo(() => {
        switch (currentLanguage) {
            case "css": return css();
            case "javascript": return javascript({ jsx: true, typescript: true });
            default: return html();
        }
    }, [currentLanguage]);

    const handleSaveClick = useCallback(() => {
        handleSave(fullCode, navigate, setSaving);
    }, [fullCode, navigate]);

    const handleCopyClick = useCallback(() => {
        handleCopy(fullCode, currentLanguage);
    }, [fullCode, currentLanguage]);

    const handleShareClick = useCallback(() => {
        handleShare(window.location.href);
    }, []);

    return (
        <div className="flex h-screen flex-col">
            {/* Editor options */}
            <div className=" flex justify-between items-center px-2 min-h-12 max-h-12">
                {/* selects */}
                <div className="flex gap-2 h-full items-center">
                    <ThemeSelect />
                    <LanguageSelect />
                </div>

                {/* buttons */}
                <div className="p-2 flex gap-2 h-full items-center">
                    {urlId && <Button disabled={saving} variant={'custom'} size={"sm"} onClick={handleShareClick}>
                        <Share2 />
                    </Button>}
                    <Button disabled={saving} variant={'custom'} size={"sm"} onClick={handleSaveClick}>
                        {saving ? <Loader2 className=" animate-spin" /> : <SaveIcon />}
                    </Button>
                    <Button variant={'custom'} size={"sm"} onClick={handleCopyClick}><CopyIcon /></Button>
                </div>
            </div>

            <div className="flex-1">
                <CodeMirror
                    value={fullCode[currentLanguage]}
                    height="calc(100dvh - 60px - 48px)"
                    extensions={[language, EditorView.lineWrapping]}
                    theme={currentTheme}
                    onChange={onChange}
                    placeholder={"Welcome to Devpen"}
                />
            </div>
        </div>
    );
}