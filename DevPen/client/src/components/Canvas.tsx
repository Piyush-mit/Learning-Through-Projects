import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { StateType } from "@/redux/store";

function buildCode(html: string, css: string, js: string) {
    return `<!Codetype html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
${css}
</style>
</head>
<body>
${html}
<script>
${js.replaceAll("</script>", "<\\/script>")}
</script>
</body>
</html>`;
}

export default function Canvas() {

    const { html, css, javascript } = useSelector(
        (state: StateType) => state.compilerSlice.fullCode
    );
    // using useMemo to compute 
    const nextCode = useMemo(() => buildCode(html, css, javascript), [html, css, javascript]);

    const [code, setCode] = useState(nextCode);
    useEffect(() => {
        const id = setTimeout(() => setCode(nextCode), 250);
        return () => clearTimeout(id);
    }, [nextCode]);

    return (
        <div className="bg-white h-full min-h-[calc(100dvh-60px)] m-0">
            <iframe
                title="rendered-code"
                className="w-full h-full"
                srcDoc={code}
                sandbox="allow-scripts allow-modals"
            />
        </div>
    );
}
