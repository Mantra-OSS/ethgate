import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { type Mock } from "jest-mock";

import { ETHGATE_NODE_TEST_CHAINS } from "../testing";

import { AksharaDaClient } from ".";

describe("AksharaDaClient", () => {
  let fetchFn: Mock<typeof fetch>;
  let client: AksharaDaClient;
  beforeEach(() => {
    fetchFn = jest.fn(fetch);
    client = new AksharaDaClient(
      {
        chainId: ETHGATE_NODE_TEST_CHAINS["1"].chainId,
        name: ETHGATE_NODE_TEST_CHAINS["1"].name,
        parent: undefined,
        parentId: undefined,
        rpcs: ETHGATE_NODE_TEST_CHAINS["1"].rpcs,
        extra: ETHGATE_NODE_TEST_CHAINS["1"],
      },
      fetchFn
    );
  });

  it("can fetch genesis", async () => {
    const result = client.execute("GetObject", [
      { type: "Block", chainId: "1", number: 0 },
    ]);
    await expect(result).resolves.toMatchObject({ number: 0 });
    // expect(fetchFn).toBeCalledTimes(1);
  });
  it("can fetch latest", async () => {
    const result = client.execute("GetLatestBlock", [{ chainId: "1" }]);
    await expect(result).resolves.toMatchObject({ chainId: "1" });
    // expect(fetchFn).toBeCalledTimes(1);
  });
});
