import type { Address, AksharaChainId, Hash, Hex } from "@ethgate/spec-node";
import { describe, expect, it, beforeEach } from "@jest/globals";
import { IDBFactory, IDBKeyRange } from "fake-indexeddb";

import { AksharaDatabase } from "./database";

describe("AksharaDatabase", () => {
  let database: AksharaDatabase;
  beforeEach(() => {
    database = new AksharaDatabase({
      name: "test",
      indexedDB: new IDBFactory(),
      IDBKeyRange,
    });
  });

  it("can order blocks", async () => {
    const blocks = [
      mockBlock("1", 3, 3000),
      mockBlock("2", 2, 2000),
      mockBlock("1", 1, 1000),
      mockBlock("3", 0, 0),
    ];
    await database.putBlock(blocks[0]);
    await database.putBlock(blocks[2]);
    await database.putBlocks([blocks[1], blocks[3]]);
    const result = database.getBlocks({}, null, blocks.length);
    await expect(result).resolves.toMatchObject(blocks);
  });

  it("can get blocks by chainId", async () => {
    const blocks1 = [
      mockBlock("1", 3, 3000),
      mockBlock("1", 2, 2000),
      mockBlock("1", 1, 1000),
      mockBlock("1", 0, 0),
    ];
    const blocks2 = [
      mockBlock("2", 3, 3000),
      mockBlock("2", 2, 2000),
      mockBlock("2", 1, 1000),
      mockBlock("2", 0, 0),
    ];
    const blocks = [...blocks1, ...blocks2];
    await database.putBlocks(blocks);
    {
      const result = database.getBlocks({ chainId: "1" }, null, blocks1.length);
      await expect(result).resolves.toMatchObject(blocks1);
    }
    {
      const result = database.getBlocks({ chainId: "2" }, null, blocks2.length);
      await expect(result).resolves.toMatchObject(blocks2);
    }
  });

  it("can get blocks by timestamp", async () => {
    const blocks = [
      mockBlock("1", 3, 3000),
      mockBlock("1", 2, 1000),
      mockBlock("1", 1, 1000),
      mockBlock("1", 0, 0),
      mockBlock("2", 3, 3000),
      mockBlock("2", 2, 1000),
      mockBlock("2", 1, 1000),
      mockBlock("2", 0, 0),
    ];
    await database.putBlocks(blocks);
    blocks.sort(
      (a, b) =>
        b.timestamp - a.timestamp ||
        // parseInt(b.chainId, 10) - parseInt(a.chainId, 10) ||
        b.chainId.localeCompare(a.chainId) ||
        b.number - a.number
    );
    {
      const result = database.getBlocks({}, 1000, blocks.length);
      await expect(result).resolves.toMatchObject(
        blocks.filter((b) => b.timestamp <= 1000)
      );
    }
  });
});

const mockBlock = (
  chainId: AksharaChainId,
  number: number,
  timestamp: number
) => {
  return {
    chainId,
    timestamp,
    hash: `0x${number}` as Hash,
    number,
    parentHash: "0x" as Hash,
    gasLimit: 0,
    gasUsed: 0,
    baseFeePerGas: 0,
    logsBloom: "0x" as Hex,
    miner: "0x" as Address,
    size: 0,
    transactions: [],
  };
};
