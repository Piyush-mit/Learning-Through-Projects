import { Link } from "react-router-dom"
import ModeToggle from "./Mode-toggle"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { StateType } from "@/redux/store"
import { findUserInfo, logout } from "@/actions/user.actions"
import { changeAuth, initialThemeState, updateUser } from "@/redux/slices/themeSlice"
import toast from "react-hot-toast"
import { SidebarTrigger } from "./ui/sidebar"
import { cssBase, htmlBase, javascriptBase, updateFullCode } from "@/redux/slices/compilerSlice"

function Header() {
  const authorised = useSelector((state: StateType) => state.themeSlice.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authorised) {
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
      } catch (error) {
        toast.error("Error connecting to server");
      }
    }
  }, [authorised])

  const handleLogout = useCallback(async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        toast.success("Logged out")
        dispatch(changeAuth(false));
        dispatch(updateUser(initialThemeState.user))
        dispatch(updateFullCode({html:htmlBase , css:cssBase ,javascript:javascriptBase}));
      }
      else toast.error(response.data.message);
    } catch (error) {
      toast.error('Logout failed')
    }
  }, [authorised])
  return (
    <div className=" sticky top-0 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-50 pr-8 pl-2 flex items-center h-[60px] justify-between flex-1">

      <Link to={'/'}>
        <div className=" flex gap-2 h-full items-center select-none">
          <SidebarTrigger className="mx-1 scale-120"/>
          <div className=" font-doto font-bold text-xl">DevPen</div>
          <div className=" font-doto text-xl">Compiler</div>
        </div>
      </Link>

      <div className=" flex items-center h-full">
        <div className="text-gray-400 flex gap-6 mx-6">
          <Link to={'/'}> <div className="hover:text-gray-200 transition-colors"> Home </div> </Link>
          <Link to={'/compiler'}> <div className="hover:text-gray-200 transition-colors"> Compiler </div> </Link>
          {!authorised && <Link to={'/signup'}> <div className="hover:text-gray-200 transition-colors"> Sign up </div> </Link>}
          {!authorised && <Link to={'/signin'}> <div className="hover:text-gray-200 transition-colors"> Sign in </div> </Link>}
          {authorised && <Link to={''}><div className="hover:text-gray-200 transition-colors hover:cursor-pointer" onClick={handleLogout}>Logout </div></Link>}
        </div>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Header