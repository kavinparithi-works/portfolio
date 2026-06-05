import { Container } from './Container'

/**
 * Full-width hairline rule between sections, inset to the site container.
 */
export function Divider() {
  return (
    <Container>
      <div className="h-px w-full bg-rule" />
    </Container>
  )
}
