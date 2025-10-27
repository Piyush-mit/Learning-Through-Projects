import { updateFullCode, type CompilerStateType } from "@/redux/slices/compilerSlice";
import toast from "react-hot-toast";
import axios from 'axios'
import type { NavigateFunction } from "react-router-dom";
import type React from "react";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export const handleSave = async (fullCode: CompilerStateType['fullCode'], navigate: NavigateFunction, setSaving: React.Dispatch<React.SetStateAction<boolean>>, title: CompilerStateType['title'], urlId?: any) => {
    try {
        setSaving(true);
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/compiler/save`, {
            fullCode: fullCode,
            title: title,
            urlId: urlId
        }, { withCredentials: true });
        if (response.status === 201 || response.status === 200) {
            toast.success("Saved successfully");
            const id = response.data.urlId;
            navigate(`/compiler/${id}`, { replace: true });
        }
        else toast.error("Saving failed");
    } catch (error: any) {
        toast.error(error.response.data.message);
    } finally {
        setSaving(false);
    }
}
export const handleCopy = async (fullCode: CompilerStateType['fullCode'], currentLanguage: CompilerStateType['currentLanguage']) => {
    try {
        await navigator.clipboard.writeText(fullCode[currentLanguage]);
        toast.success("Copied to clipboard");
    } catch (err) {
        toast.error("Copy to clipboard failed");
    }
}

export const getCode = async (urlId: string, dispatch: Dispatch<UnknownAction>) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/compiler/load/${urlId}`, { withCredentials: true });
        if (response.status === 200) {
            dispatch(updateFullCode(response.data.fullCode));
            return true;
        }
        return false;
    } catch (error: any) {
        toast.error(error.response.data.message);
        return false;
    }
}

export const handleShare = async (currentURL: string) => {
    try {
        await navigator.clipboard.writeText(currentURL);
        toast.success("Link Copied to clipboard");
    } catch (err) {
        toast.error("Copy to clipboard failed");
    }
}

export const deleteCode = async (urlId: string) => {
    try {
        
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/compiler/delete/${urlId}`, { withCredentials: true });
        if(response.status === 200){
            return response ;
        }else{
            toast.error("Deletion failed")
        }
    } catch (error:any) {
        return error.response.data.message ;
    }
}