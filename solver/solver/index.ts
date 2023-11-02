import type { AksharaAbstract, AksharaConfig } from "@/akshara/index.js";
import { chains } from "@mantra-oss/chains";
import type {
  ExecutionResult,
  // GraphQLAbstractType,
  GraphQLArgs,
  // GraphQLResolveInfo,
  GraphQLSchema,
} from "graphql";
import { execute, parse, subscribe } from "graphql";
import type { Observable } from "rxjs";
import { from, map } from "rxjs";

import { EthgateSolverDatabase } from "../database/index.js";
import { EthgateSolverSchema, SchemaContext } from "../schema/index.js";

export type Schema = GraphQLSchema;
export type Variables = GraphQLArgs["variableValues"];
export type QueryResponse = ExecutionResult;

export type PunkerBackendConfig = {
  node: AksharaAbstract;
  database?: EthgateSolverDatabase;
};

export const punkerSchema = new EthgateSolverSchema();

export class EthgateSolver {
  #networks: AksharaConfig["chains"];
  #schema: EthgateSolverSchema;
  #database: EthgateSolverDatabase;

  get database(): EthgateSolverDatabase {
    return this.#database;
  }

  static async create(config: PunkerBackendConfig): Promise<EthgateSolver> {
    const networks = chains as any;
    const database =
      config.database ??
      new EthgateSolverDatabase({
        node: config.node,
      });
    return new EthgateSolver(database, networks);
  }

  private constructor(
    database: EthgateSolverDatabase,
    networks: AksharaConfig["chains"]
  ) {
    this.#networks = networks;
    this.#database = database;
    this.#schema = punkerSchema;
  }

  get schema(): EthgateSolverSchema {
    return this.#schema;
  }

  async query(
    source: string,
    variableValues: Variables
  ): Promise<QueryResponse> {
    const document = parse(source);
    const contextValue = new SchemaContext(this.#database);
    const rootValue = undefined;
    const result = await execute({
      schema: this.#schema,
      document,
      variableValues,
      contextValue,
      rootValue,
      // typeResolver: (
      //   value: any,
      //   context: SchemaContext,
      //   info: GraphQLResolveInfo,
      //   abstractType: GraphQLAbstractType,
      // ) => {
      //   console.log('hey');
      //   return value[info.fieldName](value, context, info, abstractType);
      // },
      // fieldResolver: (source: any, args: any, context: SchemaContext, info: GraphQLResolveInfo) => {
      //   console.log('hey');
      //   return source[info.fieldName](source, args, context, info);
      // },
    });

    if (result.errors) {
      if (result.errors.length === 1) throw result.errors[0];
      result.errors.forEach((err) => console.error(err.originalError));
    }

    // You get weird errors if you don't stringify and parse the result.
    return JSON.parse(JSON.stringify(result));
  }
  async subscribe(
    source: string,
    variableValues: Variables
  ): Promise<Observable<QueryResponse>> {
    const document = parse(source);

    const contextValue = new SchemaContext(this.#database);
    const rootValue = undefined;
    const results = await subscribe({
      schema: this.#schema,
      document,
      variableValues,
      contextValue,
      rootValue,
    }).then((results) => {
      if (Symbol.asyncIterator in results) {
        return from(results);
      }
      return from([results]);
    });

    return results.pipe(
      map((item) => {
        if (item.errors) {
          item.errors.forEach((err) => console.error(err.originalError));
        }
        // You get weird errors if you don't stringify and parse the result.
        return JSON.parse(JSON.stringify(item));
      })
    );
  }
}
