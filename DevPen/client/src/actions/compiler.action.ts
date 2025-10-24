import { updateFullCode, type CompilerStateType } from "@/redux/slices/compilerSlice";
import toast from "react-hot-toast";
import axios from 'axios'
import type { NavigateFunction } from "react-router-dom";
import type React from "react";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export const handleSave = async (fullCode: CompilerStateType['fullCode'], navigate: NavigateFunction, setSaving: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        setSaving(true);
        const response = await axios.post('http://localhost:4000/api/v1/compiler/save', {
            fullCode
        });
        if (response.status === 200) {
            toast.success("Saved successfully");
            const id = response.data.urlId;
            navigate(`/compiler/${id}`, { replace: true });
        }
        else toast.error("Saving failed");
    } catch (error) {
        toast.error("Saving failed");
    } finally {
        setSaving(false);
    }
}
export const handleCopy = async (fullCode: CompilerStateType['fullCode'], currentLanguage: CompilerStateType['currentLanguage']) => {
    try {
        await navigator.clipboard.writeText(fullCode[currentLanguage]);
        toast.success("Copied to clipboard");
    } catch (err) {
        console.error("Copy failed", err);
        toast.error("Copy to clipboard failed");
    }
}

export const getCode = async (urlId: string, dispatch: Dispatch<UnknownAction>) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/compiler/load/${urlId}`);
        if (response.status === 200) {
            dispatch(updateFullCode(response.data));
            return true ;
        }
        return false ;
    } catch (error) {
        toast.error("Invalid URL");
        return false ;
    }
}

export const handleShare = async (currentURL: string) => {
    try {
        await navigator.clipboard.writeText(currentURL);
        toast.success("Link Copied to clipboard");
    } catch (err) {
        console.error("Copy failed", err);
        toast.error("Copy to clipboard failed");
    }
}


