import { heroCopy } from '../../../data/site'
import { RollingWord } from '../../ui/RollingWord'

/**
 * The three-line headline. Each line rises out of a clipped mask on load; the
 * last word rolls through heroCopy.rotating. Screen readers get a static
 * sentence ("... in the data.").
 */
export function HeroHeadline() {
  return (
    <h1 data-cursor="magnify" className="display text-hero text-ink">
      <span className="mask">
        <span className="mask-inner" style={{ '--d': '60ms' }}>
          {heroCopy.lines[0]} <span className="text-orange">{heroCopy.lines[1]}</span>
        </span>
      </span>
      <span className="mask">
        <span className="mask-inner" style={{ '--d': '140ms' }}>
          I&rsquo;m more interested
        </span>
      </span>
      <span className="mask">
        <span className="mask-inner" style={{ '--d': '220ms' }}>
          in the <RollingWord words={heroCopy.rotating} className="text-orange" />
          <span className="sr-only">{heroCopy.rotating[0]}</span>
        </span>
      </span>
    </h1>
  )
}
