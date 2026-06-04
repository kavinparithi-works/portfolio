import React from 'react'
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
