import type {
  Connection,
  EdgeAbstract,
  NodeAbstract,
  PageArgs,
  PageInfo,
  QueryResponse,
  Variables,
} from "@ethgate/lib-solver";
import { memoize } from "lodash";
import { use, useCallback, useEffect, useState } from "react";
// import type { Observable } from 'rxjs';

import { Akshara, AksharaDatabase } from "@ethgate/lib-node";
import { chains } from "@mantra-oss/chains";

export class AksharaDom extends Akshara {
  constructor() {
    const database = new AksharaDatabase({
      name: "akshara-worker",
      indexedDB: globalThis.indexedDB,
      IDBKeyRange: globalThis.IDBKeyRange,
    });
    super({ chains, fetchFn: globalThis.fetch.bind(globalThis), database });
  }
}

export const serverPromise = new AksharaDom();

// export class PunkerBackendClient {
//   #backend: EthgateSolverServer | Promise<EthgateSolverServer> = serverPromise;

//   async query(request: string, variables: Variables): Promise<QueryResponse> {
//     const backend = await this.#backend;
//     return backend.query(request, variables);
//   }
//   async subscribe(request: string, variables: Variables): Promise<Observable<QueryResponse>> {
//     const backend = await this.#backend;
//     return backend.subscribe(request, variables);
//   }
// }

export const readNode = memoize(async function readNode<T extends NodeAbstract>(
  id: T["id"]
) {
  const database = (await serverPromise).solver.database;
  const node = await database.readNode(id);
  return node;
});
export const useNode = function useNode<T extends NodeAbstract>(
  id: T["id"]
): T {
  const node = use(readNode(id));
  return node;
};

export const readConnection = memoize(async function readConnection<
  Edge extends EdgeAbstract
>(
  type: Edge["type"],
  tailId: Edge["tailId"],
  args: PageArgs<Edge>
): Promise<{ edges: Edge[]; pageInfo: PageInfo<Edge> }> {
  const database = (await serverPromise).solver.database;
  const connection = database.getConnection(type, tailId, args).collect();
  return connection;
});

export const useConnection = function useConnection<Edge extends EdgeAbstract>(
  type: Edge["type"],
  tailId: Edge["tailId"],
  args: PageArgs<Edge>
): [
  { edges: Edge[]; pageInfo: PageInfo<Edge> },
  hasNextPage: boolean,
  loadNext: (count: number) => void,
  refetch: () => void
] {
  const initialPage = use(readConnection(type, tailId, args));
  const [connection, setConnection] = useState(initialPage);
  const loadNext = useCallback(
    async (count: number) => {
      console.log("loadNext", {
        first: count,
        after: connection.pageInfo.endCursor,
      });
      const nextPage = await readConnection(type, tailId, {
        first: count,
        after: connection.pageInfo.endCursor,
      });
      console.log("nextPage", nextPage);
      setConnection((connection) => ({
        edges: [...connection.edges, ...nextPage.edges],
        pageInfo: {
          ...nextPage.pageInfo,
          hasNextPage: nextPage.pageInfo.hasNextPage,
          endCursor: nextPage.pageInfo.endCursor,
        },
      }));
    },
    [type, tailId, connection.pageInfo.endCursor]
  );
  const refetch = useCallback(async () => {
    console.log("refetch");
    // const nextPage = await readConnection(type, tailId, args);
    const database = (await serverPromise).solver.database;
    const nextPage = await database.getConnection(type, tailId, args).collect();
    setConnection(nextPage);
    // setConnection((connection) => ({
    //   edges: [...connection.edges, ...nextPage.edges],
    //   pageInfo: {
    //     ...nextPage.pageInfo,
    //     hasNextPage: nextPage.pageInfo.hasNextPage,
    //     endCursor: nextPage.pageInfo.endCursor,
    //   },
    // }));
  }, [type, tailId, args]);
  return [connection, connection.pageInfo.hasNextPage, loadNext, refetch];
};
