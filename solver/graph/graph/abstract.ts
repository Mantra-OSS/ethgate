import type { AksharaObjectSchema, Time } from '@/lib-node';

import type { AksharaTypeContext, EdgeGenerator } from '..';

export type ObjectId<Type extends string, LocalId extends string = string> = `${Type}:${LocalId}`;

export type GraphNodeMeta = {
  name: string;
  imageUrl?: string;
  slug: string;
  path: ObjectId<any>[];
  themeColor?: string;
};

export interface GraphNode<
  Name extends string = any,
  Data extends object = any,
  Id extends ObjectId<Name> = ObjectId<Name>,
> {
  type: Name;
  meta: GraphNodeMeta;
  id: Id;
  data: Data;
}

export interface GraphEdge<
  Name extends string = any,
  TailId extends string = any,
  HeadId extends string = any,
  Data extends object = any,
> {
  type: Name;
  tailId: TailId;
  headId: HeadId;
  data: Data;
  time: Time;
}

export type NodeGetFn<T extends GraphNode> = (
  id: T['id'],
  ctx: AksharaTypeContext,
) => T | void | Promise<T | void>;

export class NodeType<T extends GraphNode> {
  name: T['type'];
  get: NodeGetFn<T>;
  constructor(name: T['type'], get: NodeGetFn<T>) {
    this.name = name;
    this.get = get;
  }
}

export type ProperPageArgs<T extends GraphEdge> = {
  before?: T['headId'];
  after?: T['headId'];
  isForward: boolean;
  limit: number;
};

export type GraphEdgeGenerator<Edge extends GraphEdge> = AsyncGenerator<Edge, undefined, undefined>;

export interface EdgeType<T extends GraphEdge> {
  name: T['type'];
  tail: NodeType<any>;
  head: NodeType<any>;
  connectionName: string;
  get(tailId: T['tailId'], args: ProperPageArgs<T>, ctx: AksharaTypeContext): GraphEdgeGenerator<T>;
}

export abstract class SolverGraphAbstract {
  abstract nodeTypes: NodeType<any>[];
  abstract edgeTypes: EdgeType<any>[];

  // registerNodeType(nodeType: NodeConstructor<any>) {
  //   this.nodeTypes.push(nodeType);
  // }
  // registerEdgeType(edgeType: EdgeConstructor<any>) {
  //   this.edgeTypes.push(edgeType);
  // }

  getNodeType(type: string): NodeType<any> {
    return this.nodeTypes.find((nodeType) => nodeType.name === type)!;
  }

  getEdgeType<T extends EdgeType<any>>(type: string): T {
    return this.edgeTypes.find((edgeType) => edgeType.name === type)! as T;
  }

  getEdgeTypesForNode<T extends EdgeType<any>>(type: string): T[] {
    const nodeType = this.getNodeType(type);
    return this.edgeTypes.filter((edgeType) => edgeType.tail === nodeType)! as T[];
  }
}
