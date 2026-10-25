import { Nav } from './components/Nav/Nav'
import { Cursor } from './components/Cursor/Cursor'
import { Container, Divider } from './components/layout'
import { Hero, Principles, Work, Experience, WorkingStyle, Beyond, Contact } from './components/sections'
// import { Skills } from './components/sections' // toolbox: parked, see README "Toolbox section"

/**
 * Page composition. Each band is an isolated section; hairlines separate
 * the cream bands and Contact is dark. The toolbox (Skills) is parked for now.
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
        <Container className="pb-14 md:pb-28">
          <WorkingStyle />
        </Container>
        {/* <Skills /> */}
        <Divider />
        <Beyond />
        <Contact />
      </main>
    </>
  )
}
