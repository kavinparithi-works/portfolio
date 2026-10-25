import { Nav } from './components/Nav/Nav'
import { Cursor } from './components/Cursor/Cursor'
import { Divider } from './components/layout'
import { Hero, Principles, Work, Experience, Skills, Beyond, Contact } from './components/sections'

/**
 * Page composition. Each band is an isolated section; hairlines separate
 * the cream bands, the Skills band is a deeper cream, and Contact is dark.
 */
export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <Divider />
        <Principles />
        <Divider />
        <Work />
        <Divider />
        <Experience />
        <Skills />
        <Beyond />
        <Contact />
      </main>
    </>
  )
}
