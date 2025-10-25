import { Link } from "react-router-dom"
import ModeToggle from "./Mode-toggle"

function Header() {
  return (
    <div className=" sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-50 px-16 flex items-center h-[60px] justify-between">

      <Link to={'/'}>
        <div className=" flex gap-2 h-full items-center select-none">
          <div className=" font-doto font-bold text-xl">DevPen</div>
          <div className=" font-doto text-xl">Compiler</div>
        </div>
      </Link>

      <div className=" flex gap-4 items-center h-full">
        <div className="text-gray-400 flex gap-6">
          <Link to={'/'}> <div className="hover:text-gray-200 transition-colors"> Home </div> </Link>
          <Link to={'/signup'}> <div className="hover:text-gray-200 transition-colors"> Sign up </div> </Link>
          <Link to={'/signin'}> <div className="hover:text-gray-200 transition-colors"> Sign in </div> </Link>
          <Link to={'/compiler'}> <div className="hover:text-gray-200 transition-colors"> Compiler </div> </Link>
        </div>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Header