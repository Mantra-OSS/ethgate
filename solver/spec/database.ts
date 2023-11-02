const globalIdRegExp = /^([a-zA-Z0-9+/]+):(.*)$/;

export type NodeType = string;
export type LocalId = string;
export type GlobalId<T extends NodeType, K extends LocalId = string> = `${T}:${K}`;

export const parseGlobalId = (id: string): [type: NodeType, localId: string] => {
  const match = id.match(globalIdRegExp);
  if (!match) {
    throw new Error(`Invalid object id: ${id}`);
  }
  const [, type, localId] = match;
  return [type, localId];
};
