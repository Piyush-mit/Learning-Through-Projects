import ModeToggle from "./components/Mode-toggle"
import { Button } from "./components/ui/button"

function App() {
  return (
    <div>
      <Button variant={'secondary'}>Hello world</Button>
      <Button variant={"default"}>Namaste Duniya</Button>
      <ModeToggle />
    </div>
  )
}

export default App