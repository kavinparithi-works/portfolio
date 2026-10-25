/**
 * Single source of truth for identity, contact details, and hero copy.
 * Facts here come from the existing portfolio, the latest resume PDF and the
 * Phase 3 engagement brief.
 */
export const site = {
  name: 'Kavin Parithi Sivasamy',
  shortName: 'Kavin Parithi',
  firstName: 'Kavin',
  initial: 'K',
  role: 'Data Engineer',
  employer: 'zeb',
  email: 'kavinandhiswork@gmail.com',
  linkedin: 'https://linkedin.com/in/kavinparithi',
  instagram: 'https://www.instagram.com/kavinnn.01/',
  github: 'https://github.com/kavinparithi-works',
  location: 'Greater Chennai Area, India',
  locationShort: 'Chennai, India',
  timeZone: 'Asia/Kolkata',
  availability: 'Senior Data Engineering roles · Databricks projects',
  url: 'https://kavinparithi-works.github.io/portfolio/',
}

export const heroCopy = {
  eyebrow: 'Data Engineer · Databricks Certified Professional · Chennai',
  lines: ['I build', 'pipelines.'],
  rotating: ['data.', 'Databricks.', 'problems.', 'solutions.'],
  intro:
    "Most data pipelines fail not because of bad code, but because they were built for yesterday's data volume. I design scalable Lakehouse architectures that grow with business needs.",
  stacks: ['Databricks', 'Azure', 'Apache Spark', 'Delta Lake', 'Modern Data Engineering'],
  focus: 'Focused on building reliable, high-performance, analytics-ready business assets.',
}

/** Proof points, taken from the resume PDF and the Phase 3 brief. */
export const stats = [
  { value: 3, label: 'Industries served', sub: 'finance, insurance, chemical manufacturing' },
  { value: 200, suffix: '+', label: 'Tables migrated', sub: 'zero data loss, every metric matched' },
  { value: 50000, suffix: '+', label: 'Daily order records on DLT', sub: 'real-time tracking and replenishment' },
  { value: 166, label: 'Notebooks moved to the v2 standard', sub: 'of 456 in scope, logic byte-identical' },
]

export const contactCopy = {
  rotating: ['problem.', 'question.', 'challenge.', 'puzzle.'],
  contactFor: 'Data Engineering roles · Databricks projects · Lakehouse architectures',
  responseTime: 'Every serious inquiry gets a reply. Most responses within 24 hours.',
  quoteRotating: ['learning', 'thriving', 'working'],
  tamil: 'யாதுமாய் அழிந்து, யார் நானென மீண்டெழு !',
  tamilAccent: ['நானென', 'மீண்டெழு'],
}
