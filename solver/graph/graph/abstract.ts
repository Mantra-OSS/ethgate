import type { Akshara, Time } from '@/lib-node';

import type { GlobalId } from '../../spec/database';
import { parseGlobalId } from '../../spec/database';
import type { Block, Chain } from '../akshara';

export type GraphTypeContext = {
  aks: Akshara;
};

export type ObjectId<Type extends string, LocalId extends string = string> = `${Type}:${LocalId}`;

export type SolverNodeMeta = {
  name: string;
  imageUrl?: string;
  slug: string;
  // path: string;
  nodePath: ObjectId<any>[];
  themeColor?: string;
  chainId?: Chain['id'];
  blockId?: Block['id'];
};

export interface SolverNode<
  Name extends string = any,
  Data extends object = any,
  Id extends ObjectId<Name> = ObjectId<Name>,
> {
  type: Name;
  meta: SolverNodeMeta;
  id: Id;
  data: Data;
}

export type NodeCreateFn<T extends SolverNode> = (data: T['data']) => T;
export type NodeGetDataFn<T extends SolverNode> = (
  id: T['id'],
  ctx: GraphTypeContext,
) => T['data'] | void | Promise<T['data'] | void>;

export type SolverNodeTypeMeta = {
  name: string;
  slug: string;
};

export class NodeType<T extends SolverNode> {
  name: T['type'];
  getData: NodeGetDataFn<T>;
  create: NodeCreateFn<T>;
  constructor(name: T['type'], getData: NodeGetDataFn<T>, create: NodeCreateFn<T>) {
    this.name = name;
    this.getData = getData;
    this.create = create;
  }
  async get(id: T['id'], ctx: GraphTypeContext): Promise<T | undefined> {
    const data = await this.getData(id, ctx);
    if (!data) return;
    return this.create(data);
  }
  async read(id: T['id'], ctx: GraphTypeContext): Promise<T> {
    const node = await this.get(id, ctx);
    if (!node) {
      throw new Error(`Not found ${id}`);
    }
    return node;
  }
}

export type SolverEdgeMeta = {
  // ???
};

export abstract class SolverEdge<
  Name extends string = any,
  TailId extends string = any,
  HeadId extends string = any,
  Data extends object = any,
> {
  abstract type: Name;
  tailId: TailId;
  headId: HeadId;
  data: Data;
  time: Time;
  constructor(tailId: TailId, headId: HeadId, data: Data, time: Time) {
    this.tailId = tailId;
    this.headId = headId;
    this.data = data;
    this.time = time;
  }
  get cursor() {
    return this.headId;
  }
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

export type ProperPageArgs<T extends GraphEdge> = {
  before?: T['headId'];
  after?: T['headId'];
  isForward: boolean;
  limit: number;
};

export type GraphEdgeGenerator<Edge extends GraphEdge> = AsyncGenerator<Edge, undefined, undefined>;

export type SolverEdgeTypeMeta = {
  name: string;
  slug: string;
};

export interface EdgeType<T extends GraphEdge> {
  name: T['type'];
  tail: NodeType<any>;
  head: NodeType<any>;
  connectionName: string;
  get(tailId: T['tailId'], args: ProperPageArgs<T>, ctx: GraphTypeContext): GraphEdgeGenerator<T>;
}

export type EdgeGetFn<T extends GraphEdge> = (
  tailId: T['tailId'],
  args: ProperPageArgs<T>,
  ctx: GraphTypeContext,
) => GraphEdgeGenerator<T>;

export abstract class EdgeType2<T extends GraphEdge> {
  abstract name: T['type'];
  abstract meta: SolverEdgeTypeMeta;
  abstract tail: NodeType<any>;
  abstract head: NodeType<any>;
  abstract get: EdgeGetFn<T>;
  get connectionName() {
    return this.meta.slug;
  }
}

export abstract class SolverGraphAbstract {
  abstract nodeTypes: NodeType<any>[];
  abstract edgeTypes: EdgeType<any>[];
  abstract getRoot: () => NodeType<any>;

  // registerNodeType(nodeType: NodeConstructor<any>) {
  //   this.nodeTypes.push(nodeType);
  // }
  // registerEdgeType(edgeType: EdgeConstructor<any>) {
  //   this.edgeTypes.push(edgeType);
  // }

  getNodeTypeById(id: GlobalId<any>): NodeType<any> {
    const [type] = parseGlobalId(id);
    return this.nodeTypes.find((nodeType) => nodeType.name === type)!;
  }

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

  // resolvePath(
  //   path: string[],
  // ): ['node', NodeType<any>, string] | ['edge', NodeType<any>, string, EdgeType<any>] | undefined {
  //   const root = this.getRoot();

  //   let resolved: [NodeType<any>, string] = [root, ''];
  //   for (let i = 0; i < path.length; i += 2) {
  //     const connectionSlug = path[i];
  //     const edgeType = this.edgeTypes.find(
  //       (edgeType) =>
  //         edgeType.tail.name === resolved[0].name && edgeType.connectionName === connectionSlug,
  //     );
  //     if (!edgeType) {
  //       return;
  //     }
  //     const headSlug = path[i + 1];
  //     if (headSlug === undefined) {
  //       return ['edge', ...resolved, edgeType];
  //     }
  //     resolved = [edgeType.head, headSlug];
  //   }
  //   return ['node', ...resolved];
  // }
}
