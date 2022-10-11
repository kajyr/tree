export type CytoscapeNode = { group: 'nodes'; data: { id: string; label: string } };
export type CytoscapeEdge = { group: 'edges'; data: { source: string; target: string } };
export type CytoscapeJSON = (CytoscapeNode | CytoscapeEdge)[];
