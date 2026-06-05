import { Navbar } from './components/Navbar'
import { Cursor } from './components/Cursor'
import { Divider } from './components/layout'
import { Hero, Contributions, Work, Credentials, Beyond, Contact } from './components/sections'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useNavScrolled } from './hooks/useNavScrolled'

/**
 * Page composition. Side-effects (scroll reveal, nav border) live in hooks;
 * each band is an isolated section component separated by dividers.
 */
export default function App() {
  useScrollReveal()
  useNavScrolled()

  return (
    <div>
      {/* Black frame around the whole viewport. */}
      <div className="pointer-events-none fixed inset-0 z-[200] border-[3px] border-ink" />
      <Cursor />
      <Navbar />
      <Hero />
      <Divider />
      <Contributions />
      <Divider />
      <Work />
      <Divider />
      <Credentials />
      <Divider />
      <Beyond />
      <Contact />
    </div>
  )
}
