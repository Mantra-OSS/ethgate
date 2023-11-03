import type { Time } from '@/akshara';

export type ObjectId<Type extends string, LocalId extends string = string> = `${Type}:${LocalId}`;

export abstract class NodeAbstract<
  Name extends string = any,
  Data extends object = any,
  Id extends ObjectId<Name> = ObjectId<Name>,
> {
  abstract readonly type: Name;
  readonly id: Id;
  readonly data: Data;
  constructor(id: Id, data: Data) {
    this.id = id;
    this.data = data;
  }
}

export abstract class EdgeAbstract<
  Name extends string = any,
  TailId extends string = any,
  HeadId extends string = any,
  Data extends object = any,
> {
  abstract readonly type: Name;
  readonly tailId: TailId;
  readonly headId: HeadId;
  readonly data: Data;
  readonly time: Time;
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

export type PageArgs<Edge extends EdgeAbstract> = {
  before?: Edge['cursor'];
  after?: Edge['cursor'];
  last?: number;
  first?: number;
};
export type PageInfo<Edge extends EdgeAbstract> = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: Edge['cursor'];
  endCursor?: Edge['cursor'];
};
export type EdgeGenerator<Edge extends EdgeAbstract> = AsyncGenerator<Edge, undefined, undefined>;
export type ConnectionGenerator<Edge extends EdgeAbstract> = AsyncGenerator<
  Edge,
  PageInfo<Edge>,
  undefined
>;
export class Connection<Edge extends EdgeAbstract> implements ConnectionGenerator<Edge> {
  readonly _generator: ConnectionGenerator<Edge>;

  constructor(generator: ConnectionGenerator<Edge>) {
    this._generator = generator;
  }

  async collect(): Promise<{ edges: Edge[]; pageInfo: PageInfo<Edge> }> {
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
  return(value: PageInfo<Edge>) {
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
  DatabaseNode extends NodeAbstract,
  DatabaseEdge extends EdgeAbstract,
> {
  abstract getNode<Node extends DatabaseNode>(id: Node['id']): Promise<Node | undefined>;
  abstract getConnection<Edge extends DatabaseEdge>(
    type: Edge['type'],
    tailId_: Edge['tailId'],
    args_: PageArgs<Edge['headId']>,
  ): Connection<Edge>;

  async readNode<Node extends DatabaseNode>(id: Node['id']): Promise<Node> {
    const node = await this.getNode(id);
    if (!node) {
      throw new DatabaseNodeNotFoundError(id);
    }
    return node;
  }
}
