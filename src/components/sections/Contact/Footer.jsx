import { contactCopy } from '../../../data/site'
import { Container, Reveal } from '../../layout'

/**
 * Footer inside the dark band: just the Tamil sign-off.
 */
export function Footer() {
  const tamilParts = contactCopy.tamil.split(' ')

  return (
    <footer className="border-t border-white/10">
      <Container>
        <Reveal as="p" lang="ta" className="py-9 text-center font-tamil text-[14px] leading-[1.8] text-white/60">
          {tamilParts.map((word, i) => (
            <span key={`${word}-${i}`}>
              {contactCopy.tamilAccent.includes(word) ? <span className="text-orange-light">{word}</span> : word}
              {i < tamilParts.length - 1 ? ' ' : ''}
            </span>
          ))}
        </Reveal>
      </Container>
    </footer>
  )
}
