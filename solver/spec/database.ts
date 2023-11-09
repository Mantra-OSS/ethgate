import type { Time } from '@/lib-node';

import type { SolverEdge, SolverNode } from '../graph/graph/abstract';

export type PageArgs<TEdge extends SolverEdge> = {
  before?: TEdge['cursor'];
  after?: TEdge['cursor'];
  last?: number;
  first?: number;
};
export type PageInfo<TEdge extends SolverEdge> = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: TEdge['cursor'];
  endCursor?: TEdge['cursor'];
};
export type EdgeGenerator<TEdge extends SolverEdge> = AsyncGenerator<TEdge, undefined, undefined>;
export type ConnectionGenerator<TEdge extends SolverEdge> = AsyncGenerator<
  TEdge,
  PageInfo<TEdge>,
  undefined
>;

export type ConnectionPage<TEdge extends SolverEdge> = {
  edges: TEdge[];
  pageInfo: PageInfo<TEdge>;
};

export class Connection<TEdge extends SolverEdge> implements ConnectionGenerator<TEdge> {
  readonly _generator: ConnectionGenerator<TEdge>;

  constructor(generator: ConnectionGenerator<TEdge>) {
    this._generator = generator;
  }

  async collect(): Promise<ConnectionPage<TEdge>> {
    const edges = [];
    let item;
    while ((item = await this.next()) && !item.done) {
      const edge = item.value;
      edges.push(edge);
    }
    const pageInfo = item.value;
    return { edges, pageInfo };
  }

  // ConnectionGenerator implementation
  [Symbol.asyncIterator]() {
    return this._generator[Symbol.asyncIterator]();
  }
  next() {
    return this._generator.next();
  }
  return(value: PageInfo<TEdge>) {
    return this._generator.return(value);
  }
  throw(error: any) {
    return this._generator.throw(error);
  }
}

export abstract class DatabaseError extends Error {
  abstract readonly name: `Database${string}Error`;
  constructor(message: string) {
    super(message);
  }
}

export class DatabaseNodeNotFoundError extends DatabaseError {
  readonly name = 'DatabaseNodeNotFoundError';
  constructor(pred: any) {
    super(`Node not found: ${JSON.stringify(pred)}`);
  }
}

export abstract class DatabaseAbstract<
  TDatabaseNode extends SolverNode,
  TDatabaseEdge extends SolverEdge,
> {
  abstract getNode<TNode extends TDatabaseNode>(id: TNode['id']): Promise<TNode | undefined>;
  abstract getConnection<TEdge extends TDatabaseEdge>(
    type: TEdge['type'],
    tailId_: TEdge['tailId'],
    args_: PageArgs<TEdge['headId']>,
  ): Connection<TEdge>;

  async readNode<TNode extends TDatabaseNode>(id: TNode['id']): Promise<TNode> {
    const node = await this.getNode(id);
    if (!node) {
      throw new DatabaseNodeNotFoundError(id);
    }
    return node;
  }
}
