import type { Akshara } from '@/lib-node';

import type { GlobalId } from './id';

export type GraphTypeContext = {
  // TODO: remove this???
  aks: Akshara;
};

export type SolverNodeMeta = {
  name: string;
  imageUrl?: string;
  slug: string;
  // path: string;
  nodePath: GlobalId[];
  themeColor?: string;
  chainId?: GlobalId<'Chain'>;
  blockId?: GlobalId<'Block'>;
};

export type SolverNodeData<TType extends SolverNodeType = SolverNodeType> =
  TType extends SolverNodeType<infer TName, infer TData> ? TData : never;

export interface SolverNode<TName extends string = string, TData extends object = object> {
  type: TName;
  meta: SolverNodeMeta;
  id: GlobalId<TName>;
  data: TData;
}

export type NodeGetDataFn<TNode extends SolverNode> = (
  id: TNode['id'],
  ctx: GraphTypeContext,
) => TNode['data'] | void | Promise<TNode['data'] | void>;
export type NodeCreateFn<TNode extends SolverNode> = (data: TNode['data']) => TNode;

export type SolverNodeTypeMeta = {
  name: string;
  slug: string;
};

export abstract class SolverNodeType<
  TName extends string = string,
  TData extends object = object,
  TNode extends SolverNode<TName, TData> = SolverNode<TName, TData>,
> {
  abstract meta: SolverNodeTypeMeta;
  name: TName;
  getData: NodeGetDataFn<TNode>;
  create: NodeCreateFn<TNode>;
  constructor(name: TName, getData: NodeGetDataFn<TNode>, create: NodeCreateFn<TNode>) {
    this.name = name;
    this.getData = getData;
    this.create = create;
  }
  async get(id: TNode['id'], ctx: GraphTypeContext): Promise<TNode | undefined> {
    const data = await this.getData(id, ctx);
    if (!data) return;
    return this.create(data);
  }
  async read(id: TNode['id'], ctx: GraphTypeContext): Promise<TNode> {
    const node = await this.get(id, ctx);
    if (!node) {
      throw new Error(`Not found ${id}`);
    }
    return node;
  }
}

export interface SolverEdge<
  TName extends string = string,
  TTail extends SolverNodeType = SolverNodeType,
  THead extends SolverNodeType = SolverNodeType,
  TData extends object = object,
> {
  type: TName;
  tailId: GlobalId<TTail['name']>;
  headId: GlobalId<THead['name']>;
  data: TData;
}

export type SolverEdgeTypeMeta = {
  name: string;
  slug: string;
};

export type GraphEdgeGenerator<TEdge extends SolverEdge> = AsyncGenerator<
  TEdge,
  undefined,
  undefined
>;

export type ProperPageArgs<TEdge extends SolverEdge> = {
  before?: TEdge['headId'];
  after?: TEdge['headId'];
  isForward: boolean;
  limit: number;
};

export type EdgeGetFn<TEdge extends SolverEdge> = (
  tailId: TEdge['tailId'],
  args: ProperPageArgs<TEdge>,
  ctx: GraphTypeContext,
) => GraphEdgeGenerator<TEdge>;

export abstract class SolverEdgeType<
  TName extends string = string,
  TTail extends SolverNodeType = SolverNodeType,
  THead extends SolverNodeType = SolverNodeType,
  TData extends object = object,
  TEdge extends SolverEdge<TName, TTail, THead, TData> = SolverEdge<TName, TTail, THead, TData>,
> {
  abstract meta: SolverEdgeTypeMeta;
  abstract name: TName;
  abstract tail: TTail;
  abstract head: THead;
  abstract get: EdgeGetFn<TEdge>;
  get connectionName() {
    return this.meta.slug;
  }
}
