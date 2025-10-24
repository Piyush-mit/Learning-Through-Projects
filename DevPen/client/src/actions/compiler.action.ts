import type { CompilerStateType } from "@/redux/slices/compilerSlice";
import toast from "react-hot-toast";
import axios from 'axios'

export const handleSave = async (fullCode:CompilerStateType['fullCode']) => {
    try {
        const response = await axios.post('http://localhost:4000/api/v1/compiler/save',{
            fullCode
        });
        if(response.status === 200) toast.success("Saved successfully");
        else toast.error("Saving failed");
    } catch (error) {
        toast.error("Saving failed");
    }
}
export const handleCopy = async (fullCode : CompilerStateType['fullCode'],currentLanguage:CompilerStateType['currentLanguage']) => {
    try {
        await navigator.clipboard.writeText(fullCode[currentLanguage]);
        toast.success("Copied to clipboard");
    } catch (err) {
        console.error("Copy failed", err);
        toast.error("Copy to clipboard failed");
    }
}