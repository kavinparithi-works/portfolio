import { Reveal } from '../../layout'
import { useRotatingWord } from '../../../hooks/useRotatingWord'

const SECOND_WORDS = ['learning', 'thriving', 'working']

/**
 * Bottom footer row inside the dark contact band: a rotating-word quote plus
 * the signature. Email/LinkedIn live in the nav and the "Where" block.
 */
export function ContactFooter() {
  const second = useRotatingWord(SECOND_WORDS, 1500)

  return (
    <>
      <Reveal delay={2} className="border-t border-white/10 py-[22px] text-center">
        <p className="text-[12px] font-semibold leading-[1.4] tracking-[.2px] text-white/50">
          I believe <span className="font-bold text-orange">growth</span> is not about knowing{' '}
          <span className="text-white">everything</span>. It's about staying{' '}
          <span className="text-white">curious</span> enough to keep{' '}
          <span className="font-bold text-orange">{second}</span>.
        </p>
      </Reveal>
      <Reveal delay={3} className="flex flex-wrap items-center justify-end gap-4 border-t border-white/10 py-7">
        <span className="text-[11px] tracking-[.5px] text-white/50">
          KAVIN PARITHI SIVASAMY · DATA ENGINEER
        </span>
      </Reveal>
    </>
  )
}
