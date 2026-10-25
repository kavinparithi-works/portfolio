import { workingStyle } from '../../../data/skills'
import { Reveal } from '../../layout'

/** The working-style card can stand on its own while the toolbox is hidden. */
export function WorkingStyle({ className }) {
  return (
    <section aria-labelledby="working-style-title" className={className}>
      <div className="mb-8">
        <Reveal as="p" className="eyebrow mb-3 flex items-center gap-3">
          <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-70" />
          Working style
        </Reveal>
        <Reveal as="h2" id="working-style-title" delay={80} className="display text-display-sm text-ink">
          How I work<span className="text-orange">.</span>
        </Reveal>
      </div>
      <Reveal as="ol" role="list" className="grid gap-x-10 gap-y-5 rounded-card bg-dark p-6 text-white sm:grid-cols-2 md:p-10">
        {workingStyle.map((line, i) => (
          <li key={line} className="flex gap-3 text-[13.5px] leading-[1.65] text-white/75 md:gap-4 md:text-[14.5px]">
            <span aria-hidden="true" className="font-display text-[18px] leading-[1.3] font-black text-orange-light">0{i + 1}</span>
            {line}
          </li>
        ))}
      </Reveal>
    </section>
  )
}
