import CodeEditor from "../components/CodeEditor"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../components/ui/resizable"

function Compiler() {
  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50} className=" h-[calc(100dvh-61px)] min-w-[450px]">
          <CodeEditor />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} className=" h-[calc(100dvh-61px)] min-w-[360px]">
          Right Size
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Compiler