import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./Pages/Home"
import LoadingFallback from "./components/Loading-fallback"
import { Suspense } from "react"
import Compiler from "./Pages/Compiler"
import NotFound from "./components/NotFound"

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App;