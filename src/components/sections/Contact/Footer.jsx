import { contactCopy } from '../../../data/site'
import { Container, Reveal } from '../../layout'
import { RollingWord } from '../../ui/RollingWord'

/**
 * Footer inside the dark band: the growth line with its rolling word and the
 * Tamil sign-off.
 */
export function Footer() {
  const tamilParts = contactCopy.tamil.split(' ')

  return (
    <footer className="border-t border-white/10">
      <Container>
        <Reveal className="py-9 text-center">
          <p className="text-[13px] leading-[1.6] tracking-[0.01em] text-white/55">
            I believe <span className="font-semibold text-orange-light">growth</span> is not about knowing{' '}
            <span className="text-white">everything</span>. It&rsquo;s about staying <span className="text-white">curious</span> enough to keep{' '}
            <span className="inline-block font-semibold text-orange-light">
              <RollingWord words={contactCopy.quoteRotating} interval={2000} />
              <span className="sr-only">{contactCopy.quoteRotating[0]}</span>
            </span>
            .
          </p>
          <p lang="ta" className="mt-4 font-tamil text-[13px] leading-[1.8] text-white/55">
            {tamilParts.map((word, i) => (
              <span key={`${word}-${i}`}>
                {contactCopy.tamilAccent.includes(word) ? <span className="text-orange-light">{word}</span> : word}
                {i < tamilParts.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        </Reveal>
      </Container>
    </footer>
  )
}
