import { Button } from '../../ui/Button'
import { Icon } from '../../icons/Icon'

/**
 * The three calls to action plus a scroll hint on wide screens.
 */
export function HeroActions() {
  return (
    <div className="fade-up flex flex-wrap items-center justify-between gap-x-10 gap-y-6" style={{ '--d': '720ms' }}>
      <div className="flex flex-wrap gap-3">
        <Button href="#contact" variant="dark" icon={<Icon name="arrowUpRight" size={15} strokeWidth={2.2} />}>
          Get in touch
        </Button>
        <Button href="#work" variant="ghost" icon={<Icon name="arrowDownRight" size={15} strokeWidth={2.2} />}>
          Projects shipped
        </Button>
        <Button
          href={`${import.meta.env.BASE_URL}resume.pdf`}
          download="Kavin-Parithi-Sivasamy-Resume.pdf"
          variant="orange"
          icon={<Icon name="download" size={15} strokeWidth={2.4} className="download-cue" />}
        >
          Resume
        </Button>
      </div>
      <a href="#principles" className="group hidden items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-muted uppercase transition-colors duration-200 hover:text-ink md:inline-flex">
        <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-rule">
          <span className="scroll-line absolute inset-0 bg-orange" />
        </span>
        Scroll
      </a>
    </div>
  )
}
