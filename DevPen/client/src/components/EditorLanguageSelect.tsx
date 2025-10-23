import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export type LangKey = "javascript" | "typescript" | "jsx" | "tsx" | "html" | "css";

export default function LanguageSelect({
  value,
  onChange,
  className,
}: {
  value: LangKey;
  onChange: (v: LangKey) => void;
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={(val:LangKey) => onChange(val)}>
      <SelectTrigger className={className ?? "w-56"}>
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="javascript">JavaScript</SelectItem>
        <SelectItem value="typescript">TypeScript</SelectItem>
        <SelectItem value="jsx">JSX</SelectItem>
        <SelectItem value="tsx">TSX</SelectItem>
        <SelectItem value="html">HTML</SelectItem>
        <SelectItem value="css">CSS</SelectItem>
      </SelectContent>
    </Select>
  );
}
