import Canvas from "@/components/Canvas"
import CodeEditor from "../components/CodeEditor"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../components/ui/resizable"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeAuth, changeTheme, updateUser } from "@/redux/slices/themeSlice"
import type { StateType } from "@/redux/store"
import { useParams } from "react-router-dom"
import { getCode } from "@/actions/compiler.action"
import toast from "react-hot-toast"
import { findUserInfo } from "@/actions/user.actions"

function Compiler() {
  const dispatch = useDispatch();
  const { urlId } = useParams();

  useEffect(() => {
    if (urlId) {
      try {
        getCode(urlId, dispatch)
      } catch (error) {
        toast.error("Error fetching code")
      }
    }
  }, [urlId])

  const theme = useSelector((state: StateType) => state.themeSlice.value);
  useEffect(() => {
    const systemTheme = localStorage.getItem('vite-ui-theme');
    if (systemTheme == 'light') dispatch(changeTheme('githubLight'))
    else dispatch(changeTheme('githubDark'))
    try {
      findUserInfo().then((response) => {
        if (response.status === 200) {
          dispatch(changeAuth(true));
          const username = response.data.username;
          const email = response.data.email;
          const codes = response.data.codes;
          if (!response.data) return toast.error("Error fetching user")
          dispatch(updateUser({ username, email, codes }));
        }
      })
    } catch (error) { }
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