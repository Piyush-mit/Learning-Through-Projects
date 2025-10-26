import { Link } from "react-router-dom"
import ModeToggle from "./Mode-toggle"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { StateType } from "@/redux/store"
import { findUser, logout } from "@/actions/user.actions"
import { changeAuth } from "@/redux/slices/themeSlice"
import toast from "react-hot-toast"

function Header() {
  const authorised = useSelector((state:StateType)=>state.themeSlice.auth);
  const dispatch = useDispatch();
  useEffect(()=>{
      findUser().then((response)=>{
        if(response.status === 200) {
          dispatch(changeAuth(true));
        };
      }).catch((err:any)=>toast.error('Error connecting to server'));
  },[authorised])

  const handleLogout = useCallback(async () => {
    try {
      const response = await logout();
      if(response.status === 200) {
        toast.success("Logged out")
        dispatch(changeAuth(false));
      }
      else toast.error(response.data.message); 
    } catch (error) {
      toast.error('Logout failed')
    }
  },[authorised])
  return (
    <div className=" sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-50 px-16 flex items-center h-[60px] justify-between">

      <Link to={'/'}>
        <div className=" flex gap-2 h-full items-center select-none">
          <div className=" font-doto font-bold text-xl">DevPen</div>
          <div className=" font-doto text-xl">Compiler</div>
        </div>
      </Link>

      <div className=" flex gap-4 items-center h-full">
        <div className="text-gray-400 flex gap-6 mx-6">
          <Link to={'/'}> <div className="hover:text-gray-200 transition-colors"> Home </div> </Link>
          {!authorised && <Link to={'/signup'}> <div className="hover:text-gray-200 transition-colors"> Sign up </div> </Link>}
          {!authorised && <Link to={'/signin'}> <div className="hover:text-gray-200 transition-colors"> Sign in </div> </Link>}
          {authorised && <div className="hover:text-gray-200 transition-colors hover:cursor-pointer" onClick={handleLogout}> Logout </div>}
          <Link to={'/compiler'}> <div className="hover:text-gray-200 transition-colors"> Compiler </div> </Link>
        </div>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Header