import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"
import Navbar from "./components/Navbar"
import Hero from "./components/hero"

gsap.registerPlugin(ScrollTrigger, SplitText)

function App() {


  return (
    <main>
      <Navbar />
      <Hero />
      <div className="h-dvh bg-black">

      </div>
    </main>
  )
}

export default App
