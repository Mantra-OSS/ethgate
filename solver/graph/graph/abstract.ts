import type { Akshara, Time } from '@/lib-node';
import type { GlobalId } from '@/spec-solver';
import { parseGlobalId } from '@/spec-solver';

import type { Block, Chain } from '../akshara';

export type GraphTypeContext = {
  aks: Akshara;
};

export type SolverNodeMeta = {
  name: string;
  imageUrl?: string;
  slug: string;
  // path: string;
  nodePath: GlobalId<any>[];
  themeColor?: string;
  chainId?: Chain['id'];
  blockId?: Block['id'];
};

export interface SolverNode<
  TName extends string = any,
  TData extends object = any,
  TId extends GlobalId<TName> = GlobalId<TName>,
> {
  type: TName;
  meta: SolverNodeMeta;
  id: TId;
  data: TData;
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

export class NodeType<T extends SolverNode = SolverNode> {
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
  TName extends string = any,
  TTailId extends string = any,
  THeadId extends string = any,
  TData extends object = any,
> {
  abstract type: TName;
  tailId: TTailId;
  headId: THeadId;
  data: TData;
  time: Time;
  constructor(tailId: TTailId, headId: THeadId, data: TData, time: Time) {
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
  TName extends string = any,
  TTailId extends string = any,
  THeadId extends string = any,
  TData extends object = any,
> {
  type: TName;
  tailId: TTailId;
  headId: THeadId;
  data: TData;
  time: Time;
}

export type ProperPageArgs<T extends GraphEdge> = {
  before?: T['headId'];
  after?: T['headId'];
  isForward: boolean;
  limit: number;
};

export type GraphEdgeGenerator<TEdge extends GraphEdge> = AsyncGenerator<
  TEdge,
  undefined,
  undefined
>;

export type SolverEdgeTypeMeta = {
  name: string;
  slug: string;
};

export interface EdgeType<T extends GraphEdge> {
  typeName: T['type'];
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

export abstract class EdgeType2<T extends GraphEdge = GraphEdge> {
  abstract typeName: T['type'];
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
    return this.edgeTypes.find((edgeType) => edgeType.typeName === type)! as T;
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
