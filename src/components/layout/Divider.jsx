import { Container } from './Container'

/**
 * Hairline rule between sections, inset to the site container.
 */
export function Divider() {
  return (
    <Container aria-hidden="true">
      <div className="h-px w-full bg-rule" />
    </Container>
  )
}
