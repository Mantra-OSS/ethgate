"use client";
import {
  NodeAbstract,
  type EdgeAbstract,
  type PageArgs,
  type PageInfo,
} from "@ethgate/lib-solver";
import { use, useCallback, useState } from "react";
import { readConnection, readNode, serverPromise } from "./backend";

export const useNode = function useNode<T extends NodeAbstract>(
  id: T["id"]
): T {
  const node = use(readNode(id));
  return node;
};

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
