import { BasePerson, Person } from 'types';

type CytoscapeNode = { group: 'nodes'; data: { id: string; label: string } };
type CytoscapeEdge = { group: 'edges'; data: { source: string; target: string } };
export type CytoscapeJSON = (CytoscapeNode | CytoscapeEdge)[];

// from frontend/helpers
function name(p: BasePerson) {
  const a = [p.name || 'Unknown'];

  if (p.surname) {
    a.push(p.surname);
  }

  return a.join(' ');
}

function person2Node(p: BasePerson): CytoscapeNode {
  return { data: { id: String(p._id), label: name(p) }, group: 'nodes' };
}

function getCytoscapeJson(
  person: Person,
  father: Person | null | undefined,
  mother: Person | null | undefined,
  children: Person[]
) {
  const pn = person2Node(person);
  const list: CytoscapeJSON = [pn];

  if (father) {
    const fatherN = person2Node(father);
    list.push(fatherN);
    list.push({ data: { source: pn.data.id, target: fatherN.data.id }, group: 'edges' });
  }
  if (mother) {
    const motherN = person2Node(mother);
    list.push(motherN);
    list.push({ data: { source: pn.data.id, target: motherN.data.id }, group: 'edges' });
  }

  for (const child of children) {
    const cn = person2Node(child);
    list.push(cn);
    list.push({ data: { source: cn.data.id, target: pn.data.id }, group: 'edges' });
  }
  return list;
}

export default getCytoscapeJson;
