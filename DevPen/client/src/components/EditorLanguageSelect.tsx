import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { updateCurrentLanguage, type CompilerStateType } from "@/redux/slices/compilerSlice";
import type { StateType } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default React.memo(function LanguageSelect() {
    const currentLanguage = useSelector((state: StateType) => state.compilerSlice.currentLanguage);
    const dispatch = useDispatch();
    return (
        <Select onValueChange={(value: CompilerStateType["currentLanguage"]) => dispatch(updateCurrentLanguage(value))} defaultValue={currentLanguage}>
            <SelectTrigger className="focus-visible:border focus-visible:ring-0 w-40 max-w-40">
                <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="focus:ring-0">
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
            </SelectContent>
        </Select>
    );
})
