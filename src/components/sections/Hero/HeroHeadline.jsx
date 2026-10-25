import { heroCopy } from '../../../data/site'
import { RollingWord } from '../../ui/RollingWord'

/**
 * The three-line headline with an instant word swap on the last line.
 * Screen readers get the static sentence ("... in the data.").
 */
export function HeroHeadline() {
  return (
    <h1 data-cursor="magnify" className="display text-hero text-ink">
      <span className="block">
        {heroCopy.lines[0]} <span className="text-orange">{heroCopy.lines[1]}</span>
      </span>
      <span className="block">
        I&rsquo;m more interested
      </span>
      <span className="block">
        in the <RollingWord words={heroCopy.rotating} className="text-orange" />
        <span className="sr-only">{heroCopy.rotating[0]}</span>
      </span>
    </h1>
  )
}
