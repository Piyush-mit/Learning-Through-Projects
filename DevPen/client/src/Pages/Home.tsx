import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="w-screen h-[calc(100dvh-60px)] flex justify-center flex-col items-center gap-3">
      <div className="text-primary leading-tighter text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter max-w-4xl">The foundation for your web playground</div>
      <div className="text-foreground max-w-3xl text-base text-balance sm:text-lg text-center">A clean, reliable compiler you can customize, enhance, and reuse. Start here, then own the flow. Open sandbox. Open code.</div>
      <Link to={'/compiler'}><Button variant={'custom'}>Get Started</Button></Link>
    </div>
  )
}

export default Home