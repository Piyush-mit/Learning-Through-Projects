
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

export type ThemeKey = ""
    | "githubDark"
    | "githubLight"
    | "dracula"
    | "atomone"
    | "materialDark"
    | "materialLight";

export default function ThemeSelect({
    value,
    onChange,
    className,
}: {
    value?: ThemeKey;
    onChange: (v: ThemeKey) => void;
    className?: string;
}) {
    return (
        <Select value={value} onValueChange={(selectedVal:ThemeKey) => onChange(selectedVal)}>
            <SelectTrigger className={className ?? "w-64"}>
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
}
