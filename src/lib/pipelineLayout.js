/**
 * Pure layout for the architecture diagram: stages become columns, adjacent
 * stages are connected, and everything is returned in viewBox units.
 *
 * A stage with `flow: 'chain'` (the medallion layers) runs top to bottom: its
 * nodes are joined vertically, connections from the previous stage land on
 * its first node and connections to the next stage leave from its last.
 * A node may be `{ label, from }` to name the previous-stage node(s) that
 * feed it, matched on the label prefix (so `from: 'Silver'` also finds
 * "Silver via apply_changes"). Every other node is connected automatically.
 */
const W = 760
const NODE_H = 40
const GAP_Y = 12
const CHAIN_GAP_Y = 26
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

const toNode = (node) => (typeof node === 'string' ? { label: node } : node)
const gapOf = (stage) => (stage.flow === 'chain' ? CHAIN_GAP_Y : GAP_Y)
const heightOf = (stage) => stage.nodes.length * NODE_H + (stage.nodes.length - 1) * gapOf(stage)
const feeds = (node, from) => node.label.toLowerCase().startsWith(String(from).toLowerCase())

/** Fan out when either side is a single node, otherwise pair by position. */
function pair(outlets, inlets) {
  if (outlets.length === 1 || inlets.length === 1) return outlets.flatMap((a) => inlets.map((b) => [a, b]))
  const map = (k, n1, n2) => Math.round((k * (n2 - 1)) / (n1 - 1))
  const pairs = outlets.map((a, i) => [a, inlets[map(i, outlets.length, inlets.length)]])
  inlets.forEach((b, j) => {
    if (!pairs.some(([, to]) => to === b)) pairs.push([outlets[map(j, inlets.length, outlets.length)], b])
  })
  return pairs
}

/**
 * Lays out stages as columns, connects adjacent stages, and returns nodes +
 * bezier paths in viewBox units. Pure, so it is easy to test.
 */
export function layoutPipeline(stages) {
  const normalised = stages.map((stage) => ({ ...stage, nodes: stage.nodes.map(toNode) }))
  const bodyH = Math.max(...normalised.map(heightOf))
  const height = LABEL_H + bodyH + PAD_Y * 2
  const colW = W / stages.length
  const nodeW = colW - NODE_INSET * 2

  const columns = normalised.map((stage, si) => {
    const top = LABEL_H + PAD_Y + (bodyH - heightOf(stage)) / 2
    return {
      label: stage.label,
      chain: stage.flow === 'chain',
      x: si * colW + NODE_INSET,
      nodes: stage.nodes.map((node, ni) => ({
        id: `${si}-${ni}`,
        label: node.label,
        from: node.from,
        lines: wrap(node.label),
        x: si * colW + NODE_INSET,
        y: top + ni * (NODE_H + gapOf(stage)),
        w: nodeW,
        h: NODE_H,
        stage: si,
        index: ni,
      })),
    }
  })

  const paths = []
  const curve = (a, b) => {
    const x1 = a.x + a.w
    const y1 = a.y + a.h / 2
    const x2 = b.x
    const y2 = b.y + b.h / 2
    const cx = (x1 + x2) / 2
    return `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`
  }

  columns.forEach((col, si) => {
    if (col.chain) {
      col.nodes.slice(1).forEach((b, i) => {
        const a = col.nodes[i]
        const x = a.x + a.w / 2
        paths.push({ id: `${si}-${a.index}-${b.index}-chain`, stage: si, d: `M${x},${a.y + a.h} L${x},${b.y}` })
      })
    }
    const next = columns[si + 1]
    if (!next) return
    const seen = new Set()
    const add = (a, b) => {
      const id = `${si}-${a.index}-${b.index}`
      if (seen.has(id)) return
      seen.add(id)
      paths.push({ id, stage: si, d: curve(a, b) })
    }
    next.nodes
      .filter((b) => b.from != null)
      .forEach((b) => [b.from].flat().forEach((from) => col.nodes.filter((a) => feeds(a, from)).forEach((a) => add(a, b))))
    const outlets = col.chain ? col.nodes.slice(-1) : col.nodes
    const inlets = (next.chain ? next.nodes.slice(0, 1) : next.nodes).filter((b) => b.from == null)
    if (inlets.length) pair(outlets, inlets).forEach(([a, b]) => add(a, b))
  })

  return { width: W, height, columns, paths }
}
