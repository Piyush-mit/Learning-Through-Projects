import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./Pages/Home"
import LoadingFallback from "./components/Loading-fallback"
import { Suspense } from "react"
import Compiler from "./Pages/Compiler"
import NotFound from "./components/NotFound"
import SignUp from "./Pages/Signup"
import SignIn from "./Pages/SignIn"
import { AppSidebar } from "./components/Sidebar"
import { SidebarProvider } from "./components/ui/sidebar"

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SidebarProvider>
        <AppSidebar/>
        <div className="flex-col flex-1">
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compiler/:urlId?" element={<Compiler />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SidebarProvider>
    </Suspense>
  )
}

export default App;