import { workingStyle } from '../../../data/skills'
import { Reveal } from '../../layout'
import { cn } from '../../../lib/cn'

/** The working-style card can stand on its own while the toolbox is hidden. */
export function WorkingStyle({ className }) {
  return (
    <Reveal
      as="section"
      aria-labelledby="working-style-title"
      className={cn('grid gap-6 rounded-card bg-dark p-6 text-white md:grid-cols-[220px_1fr] md:gap-8 md:p-10', className)}
    >
      <div>
        <p className="eyebrow text-white/60">Working style</p>
        <h2 id="working-style-title" className="display mt-3 text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.02]">
          How I <br className="hidden md:block" />work<span className="text-orange-light">.</span>
        </h2>
      </div>
      <ol role="list" className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
        {workingStyle.map((line, i) => (
          <li key={line} className="flex gap-3 text-[13.5px] leading-[1.65] text-white/75 md:gap-4 md:text-[14.5px]">
            <span aria-hidden="true" className="font-display text-[18px] leading-[1.3] font-black text-orange-light">0{i + 1}</span>
            {line}
          </li>
        ))}
      </ol>
    </Reveal>
  )
}
