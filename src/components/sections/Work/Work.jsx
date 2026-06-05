import { Container, Section, Reveal } from '../../layout'
import { projects } from '../../../data/projects'
import { ProjectItem } from './ProjectItem'

/**
 * "Selected Works" — a vertical list of project case studies.
 */
export function Work() {
  return (
    <Section id="work" className="py-20">
      <Container>
        <Reveal as="p" className="mb-4 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[2px] text-muted">
          From problem to production
        </Reveal>
        <Reveal as="h2" delay={1} className="mb-[56px] font-barlow text-display font-black uppercase text-ink">
          PROJECTS SHIPPED.
        </Reveal>
        <div className="flex flex-col gap-4">
          {projects.map((project, index) => (
            <ProjectItem key={project.title} index={index} {...project} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
