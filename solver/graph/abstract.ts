import type { AksharaObjectSchema } from '@/lib-node';

import type { AksharaTypeContext, EdgeGenerator, SolverEdge, SolverNode } from '../data';

// export type NodeType = {
//   //idgetter
//   id: string
//   //ctor
//   new(...args:any[]): NodeType
// }
// const asd  =  new RegExp('asd');
// type Asd  =  RegExpConstructor;

export interface NodeType<T extends SolverNode> {
  name: T['type'];
  schema: Extract<AksharaObjectSchema, { aksharaType: T['type'] }>;
  get(id: T['id'], ctx: AksharaTypeContext): Promise<T | void>;
}

export type ProperPageArgs<T extends SolverEdge> = {
  before?: T['cursor'];
  after?: T['cursor'];
  isForward: boolean;
  limit: number;
};

export interface EdgeType<T extends SolverEdge> {
  name: T['type'];
  tail: NodeType<any>;
  head: NodeType<any>;
  connectionName: string;
  get(tailId: T['tailId'], args: ProperPageArgs<T>, ctx: AksharaTypeContext): EdgeGenerator<T>;
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

  getEdgeTypesForNode<T extends EdgeType<any>>(type: string): T {
    const nodeType = this.getNodeType(type);
    return this.edgeTypes.find((edgeType) => edgeType.tail === nodeType)! as T;
  }
}
