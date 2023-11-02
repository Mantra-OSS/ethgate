import { Akshara, AksharaDatabase } from "@/akshara/index.js";
import { ETHGATE_NODE_TEST_CHAINS } from "@/akshara/testing/index.js";
import { beforeEach, describe, expect, it } from "@jest/globals";
import fetch from "cross-fetch";
import { IDBFactory, IDBKeyRange } from "fake-indexeddb";

import { EthgateSolverDatabase } from "./index.js";

describe("EthgateSolverDatabase", () => {
  let node: Akshara;
  beforeEach(() => {
    const chains = ETHGATE_NODE_TEST_CHAINS;
    const fetchFn = fetch;
    const database = new AksharaDatabase({
      name: "test",
      indexedDB: new IDBFactory(),
      IDBKeyRange: IDBKeyRange,
    });
    node = new Akshara({ chains, fetchFn, database });
  });

  it('can read "Chain:1"', async () => {
    const db = new EthgateSolverDatabase({ node });
    await expect(db.readNode("Chain:1")).resolves.toMatchObject({
      id: "Chain:1",
      data: {
        chainId: "1",
      },
    });
  });

  it("can read ChainHasBlock with no blocks in cache", async () => {
    const db = new EthgateSolverDatabase({ node });
    const eth = await db.readNode("Chain:1");
    const { edges, pageInfo } = await db
      .getConnection("ChainHasBlock", eth.id, {
        first: 10,
      })
      .collect();
    expect(edges).toHaveLength(0);
    expect(pageInfo.hasNextPage).toBe(false);
    expect(pageInfo.hasPreviousPage).toBe(false);
    expect(pageInfo.startCursor).not.toBeDefined();
    expect(pageInfo.endCursor).not.toBeDefined();
  });

  it("can read ChainHasBlock", async () => {
    const db = new EthgateSolverDatabase({ node });
    const eth = await db.readNode("Chain:1");
    const latestBlock = await db
      .networkUpdates("Chain:1")
      .next()
      .then((result) => {
        if (result.done) {
          throw new Error("Iterator was closed before a value was yielded");
        }
        return result.value;
      });
    const { edges, pageInfo } = await db
      .getConnection("ChainHasBlock", eth.id, {
        first: 10,
      })
      .collect();
    expect(edges).toHaveLength(10);
    expect(pageInfo.hasNextPage).toBe(true);
    expect(pageInfo.hasPreviousPage).toBe(false);
    expect(pageInfo.startCursor).toBe(latestBlock.cursor);
    expect(pageInfo.endCursor).toBe(edges[9].cursor);
  });

  it("can read ChainHasBlock after cursor", async () => {
    const db = new EthgateSolverDatabase({ node });
    const eth = await db.readNode("Chain:1");
    const latestBlock = await db
      .networkUpdates("Chain:1")
      .next()
      .then((result) => {
        if (result.done) {
          throw new Error("Iterator was closed before a value was yielded");
        }
        return result.value;
      });
    const { edges: allEdges } = await db
      .getConnection("ChainHasBlock", eth.id, {
        first: 11,
      })
      .collect();
    const expectedEdges = allEdges.slice(1);
    const { edges, pageInfo } = await db
      .getConnection("ChainHasBlock", eth.id, {
        first: 10,
        after: latestBlock.cursor,
      })
      .collect();
    expect(edges).toHaveLength(10);
    expect(pageInfo.hasNextPage).toBe(true);
    expect(pageInfo.hasPreviousPage).toBe(false);
    expect(pageInfo.startCursor).toBe(expectedEdges[0].cursor);
    expect(pageInfo.endCursor).toBe(
      expectedEdges[expectedEdges.length - 1].cursor
    );
  });

  it("can read ChainHasBlock with after and before", async () => {
    const db = new EthgateSolverDatabase({ node });
    const eth = await db.readNode("Chain:1");
    const latestBlock = await db
      .networkUpdates("Chain:1")
      .next()
      .then((result) => {
        if (result.done) {
          throw new Error("Iterator was closed before a value was yielded");
        }
        return result.value;
      });
    const { edges: allEdges } = await db
      .getConnection("ChainHasBlock", eth.id, {
        first: 11,
      })
      .collect();
    const expectedEdges = allEdges.slice(1, -1);
    const { edges, pageInfo } = await db
      .getConnection("ChainHasBlock", eth.id, {
        first: 10,
        after: latestBlock.cursor,
        before: allEdges[allEdges.length - 1].cursor,
      })
      .collect();
    expect(edges).toHaveLength(9);
    expect(pageInfo.hasNextPage).toBe(false);
    expect(pageInfo.hasPreviousPage).toBe(false);
    expect(pageInfo.startCursor).toBe(expectedEdges[0].cursor);
    expect(pageInfo.endCursor).toBe(
      expectedEdges[expectedEdges.length - 1].cursor
    );
  });
});
