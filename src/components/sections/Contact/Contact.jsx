import React from 'react'
import { Section, Reveal } from '../../layout'
import { ContactInfo } from './ContactInfo'
import { ContactFooter } from './ContactFooter'
import { useRotatingWord } from '../../../hooks/useRotatingWord'

/** Closing words cycled through the CTA headline, 2s apart. */
const ROTATING_WORDS = ['PROBLEM.', 'QUESTION.', 'CHALLENGE.', 'PUZZLE.']

/**
 * Dark closing band: oversized call-to-action, contact details, and footer.
 * The final word of the headline rotates on a 2s interval.
 */
export function Contact() {
  const word = useRotatingWord(ROTATING_WORDS, 1200)

  return (
    <Section
      id="contact"
      className="border-y-2 border-teal/50 bg-dark px-[64px] pt-[100px] max-[680px]:px-[22px]"
    >
      <div className="mx-auto max-w-site">
        <Reveal
          as="h2"
          data-cursor="magnify"
          className="mb-[72px] font-barlow text-contact font-black uppercase text-white"
        >
          NOW. BRING ME<br />THE HARD
          <span className="block text-orange"> {word}</span>
        </Reveal>

        <ContactInfo />
        <ContactFooter />
      </div>
    </Section>
  )
}
