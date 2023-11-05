const globalIdRegExp = /^([a-zA-Z0-9+/]+):(.*)$/;

export type NodeType = string;
export type LocalId = string;
export type GlobalId<T extends NodeType, K extends LocalId = string> = `${T}:${K}`;

export function parseGlobalId<T extends NodeType, K extends LocalId = string>(
  id: GlobalId<T, K>,
): [type: T, localId: K] {
  const match = id.match(globalIdRegExp);
  if (!match) {
    throw new Error(`Invalid object id: ${id}`);
  }
  const [, type, localId] = match;
  return [type, localId] as any;
}

export function formatGlobalId<T extends NodeType, K extends LocalId = string>(
  type: T,
  localId: K,
): GlobalId<T, K> {
  return `${type}:${localId}`;
}
