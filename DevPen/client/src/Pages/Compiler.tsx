import Canvas from "@/components/Canvas"
import CodeEditor from "../components/CodeEditor"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../components/ui/resizable"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeTheme } from "@/redux/slices/themeSlice"
import type { StateType } from "@/redux/store"
import { useParams } from "react-router-dom"
import { getCode } from "@/actions/compiler.action"
import toast from "react-hot-toast"

function Compiler() {
  const dispatch = useDispatch();
  const { urlId } = useParams();
  
  useEffect(() => {
    if (urlId) {
      try {
        getCode(urlId, dispatch).then()
      } catch (error) {
        toast.error("")
      }
    }
  }, [urlId])

  const theme = useSelector((state: StateType) => state.themeSlice.value);
  useEffect(() => {
    const systemTheme = localStorage.getItem('vite-ui-theme');
    if (systemTheme != 'dark') dispatch(changeTheme('githubLight'))
    else dispatch(changeTheme('githubDark'))
  }, []);
  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50} className=" h-[calc(100dvh-61px)] min-w-[450px]">
          <CodeEditor theme={theme} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} className=" h-[calc(100dvh-61px)] min-w-[360px]">
          <Canvas />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Compiler