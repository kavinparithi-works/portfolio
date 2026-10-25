/**
 * Pure layout for the architecture diagram: stages become columns, adjacent
 * stages are connected, and everything is returned in viewBox units.
 */
const W = 760
const NODE_H = 40
const GAP_Y = 12
const LABEL_H = 26
const PAD_Y = 10
const NODE_INSET = 20

/** Split long labels onto two lines near the middle. */
function wrap(label) {
  if (label.length <= 17) return [label]
  const mid = Math.floor(label.length / 2)
  let cut = -1
  for (let i = 0; i < label.length; i++) {
    if (label[i] === ' ' && (cut === -1 || Math.abs(i - mid) < Math.abs(cut - mid))) cut = i
  }
  return cut === -1 ? [label] : [label.slice(0, cut), label.slice(cut + 1)]
}

/**
 * Lays out stages as columns, connects adjacent stages, and returns nodes +
 * bezier paths in viewBox units. Pure, so it is easy to test.
 */
export function layoutPipeline(stages) {
  const maxNodes = Math.max(...stages.map((s) => s.nodes.length))
  const bodyH = maxNodes * NODE_H + (maxNodes - 1) * GAP_Y
  const height = LABEL_H + bodyH + PAD_Y * 2
  const colW = W / stages.length
  const nodeW = colW - NODE_INSET * 2

  const columns = stages.map((stage, si) => {
    const n = stage.nodes.length
    const colH = n * NODE_H + (n - 1) * GAP_Y
    const top = LABEL_H + PAD_Y + (bodyH - colH) / 2
    return {
      label: stage.label,
      x: si * colW + NODE_INSET,
      nodes: stage.nodes.map((label, ni) => ({
        id: `${si}-${ni}`,
        label,
        lines: wrap(label),
        x: si * colW + NODE_INSET,
        y: top + ni * (NODE_H + GAP_Y),
        w: nodeW,
        h: NODE_H,
        stage: si,
        index: ni,
      })),
    }
  })

  const paths = []
  for (let si = 0; si < columns.length - 1; si++) {
    const from = columns[si].nodes
    const to = columns[si + 1].nodes
    const pairs = new Set()
    if (from.length === 1 || to.length === 1) {
      from.forEach((a) => to.forEach((b) => pairs.add(`${a.index}:${b.index}`)))
    } else {
      const map = (k, n1, n2) => Math.round((k * (n2 - 1)) / (n1 - 1))
      from.forEach((a) => pairs.add(`${a.index}:${map(a.index, from.length, to.length)}`))
      to.forEach((b) => {
        if (![...pairs].some((p) => p.endsWith(`:${b.index}`))) pairs.add(`${map(b.index, to.length, from.length)}:${b.index}`)
      })
    }
    for (const pair of pairs) {
      const [ai, bi] = pair.split(':').map(Number)
      const a = from[ai]
      const b = to[bi]
      const x1 = a.x + a.w
      const y1 = a.y + a.h / 2
      const x2 = b.x
      const y2 = b.y + b.h / 2
      const cx = (x1 + x2) / 2
      paths.push({ id: `${si}-${ai}-${bi}`, stage: si, d: `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}` })
    }
  }

  return { width: W, height, columns, paths }
}
