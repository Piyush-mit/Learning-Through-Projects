import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { changeTheme } from "@/redux/slices/themeSlice";
import type { StateType } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default React.memo(function ThemeSelect() {
    const theme = useSelector((state: StateType) => state.themeSlice.value);
    const dispatch = useDispatch();
    return (
        <Select onValueChange={(selectedVal) => dispatch(changeTheme(selectedVal))} defaultValue={theme} value={theme}>
            <SelectTrigger className="focus-visible:border focus-visible:ring-0 w-40 max-w-40">
                <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="githubDark">GitHub Dark</SelectItem>
                <SelectItem value="githubLight">GitHub Light</SelectItem>
                <SelectItem value="dracula">Dracula</SelectItem>
                <SelectItem value="atomone">Atom One</SelectItem>
                <SelectItem value="materialDark">Material Dark</SelectItem>
                <SelectItem value="materialLight">Material Light</SelectItem>
            </SelectContent>
        </Select>
    );
})
