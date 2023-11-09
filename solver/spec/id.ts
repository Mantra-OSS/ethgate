const globalIdRegExp = /^([a-zA-Z0-9+/]+):(.*)$/;

export type NodeTypeName = string;
export type LocalId = string;
export type GlobalId<T extends NodeTypeName = NodeTypeName> = `${T}:${LocalId}`;

export function parseGlobalId<TNodeType extends NodeTypeName>(
  id: GlobalId<TNodeType>,
): [type: TNodeType, localId: LocalId] {
  const match = id.match(globalIdRegExp);
  if (!match) {
    throw new Error(`Invalid object id: ${id}`);
  }
  const [, type, localId] = match;
  return [type, localId] as any;
}

export function formatGlobalId<TNodeType extends NodeTypeName>(
  type: TNodeType,
  localId: LocalId,
): GlobalId<TNodeType> {
  return `${type}:${localId}`;
}
