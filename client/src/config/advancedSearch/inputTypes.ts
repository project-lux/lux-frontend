// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const text: any = {
  id: {
    label: 'LUX URI',
    relation: 'text',
  },
  identifier: {
    label: 'identifier',
    relation: 'text',
  },
  name: {
    label: 'name',
    relation: 'text',
  },
  text: {
    label: 'text',
    relation: 'text',
  },
  // references: 'references', <-- TODO: what should this do?
}

export const dimensions: Array<string> = [
  'depth',
  'dimension',
  'height',
  'width',
]

export const comparators: Record<string, string> = {
  '<': 'less than',
  '<=': 'less than or equal to',
  '>': 'greater than',
  '>=': 'greater than or equal to',
  '=': 'equals',
  '!=': 'not equals',
}
