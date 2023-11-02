import { Akshara, AksharaDatabase } from "@/akshara/index.js";
import { ETHGATE_NODE_TEST_CHAINS } from "@/akshara/testing/index.js";
import { beforeEach, describe, expect, it } from "@jest/globals";
import fetch from "cross-fetch";
import { IDBFactory, IDBKeyRange } from "fake-indexeddb";
import { firstValueFrom, toArray } from "rxjs";

import { EthgateSolver } from "./index.js";

describe("EthgateSolver", () => {
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

  it("can fetch genesis", async () => {
    const solver = await EthgateSolver.create({ node });
    const result = await solver.query(
      `
        query TestQuery {
          root {
            chain(chainId: "1") {
              block(number: 0) {
                number
                transactions(first: 9999) {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      `,
      {}
    );
    expect(result.errors).toBe(undefined);
    const data = result.data! as any;
    const chain = data.root.chain as any;
    expect(chain.block.number).toBe(0);
    expect(chain.block.transactions.edges).toHaveLength(0);
  });

  it.skip("can fetch chain transactions", async () => {
    const solver = await EthgateSolver.create({ node });
    const result = await solver.query(
      `
        query TestQuery {
          root {
            chain(chainId: "1") {
              transactions(first: 1) {
                edges {
                  node {
                    transactionIndex
                  }
                }
              }
            }
          }
        }
      `,
      {}
    );
    expect(result.errors).toBe(undefined);
    const data = result.data! as any;
    const chain = data.root.chain as any;
    expect(chain.blocks.edges).toHaveLength(1);
  });

  it.skip("can fetch latest", async () => {
    const solver = await EthgateSolver.create({ node });
    const result = await solver.query(
      `
        query TestQuery {
          root {
            chain(id: "1") {
              blocks(first: 1) {
                edges {
                  node {
                    number
                    transactions(first: 1) {
                      edges {
                        node {
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      {}
    );
    expect(result.errors).toBe(undefined);
    const data = result.data! as any;
    const chain = data.root.chain as any;
    expect(chain.blocks.edges).toHaveLength(1);
  });

  it.skip("works", async () => {
    const solver = await EthgateSolver.create({ node });
    const result = await solver.query(
      `
        query TestQuery {
          root {
            chain(id: "1") {
              blocks(last: 1) {
                edges {
                  node {
                    number
                  }
                }
              }
            }
          }
        }
      `,
      {}
    );
    expect(result.errors).toBe(undefined);
    const chain = result.data!.chain as any;
    expect(chain.blocks.edges).toHaveLength(1);
    expect(chain.blocks.edges[0].node.number).toBe("0x0");
  });

  it.skip("can paginate blocks", async () => {
    const solver = await EthgateSolver.create({ node });
    const result = await solver.query(
      `
        query BlockPaginationQuery(
          $id: ID!,
          $first: Int!,
          $after: Cursor
        ) {
          chain(id: $id) {
            blocks(first: $first, after: $after) {
              edges {
                node {
                  number
                }
              }
            }
          }
        }
      `,
      {
        id: "Chain:1",
        first: 1,
        after: "1",
      }
    );
    expect(result.errors).toBe(undefined);
    const chain = result.data!.chain as any;
    expect(chain.blocks.edges).toHaveLength(1);
    expect(chain.blocks.edges[0].node.number).toBe("0x0");
  });

  // it('works222', async () => {
  //   const solver = await EthgateSolver.create({ node });
  //   const result = await solver.query(
  //     `
  //       query TestQuery {
  //         network(id: "Network:1") {
  //           transactions(first: 1) {
  //             edges {
  //               node {
  //                 id
  //               }
  //             }
  //           }
  //         }
  //       }
  //     `,
  //     {},
  //   );
  //   expect(result.errors).toBe(undefined);
  //   const network = result.data!.network as any;
  //   expect(network.transactions.edges).toHaveLength(1);
  // });

  // const networks = testNetworks;
  // const mainnetSpy = jest.spyOn(networks['1'].transport, 'requestMany');
  // const provider = new EthgateProvider({
  //   networks: {
  //     ...networks,
  //     '1': {
  //       ...networks['1'],
  //       transport: new DataLoaderTransport({
  //         transport: networks['1'].transport,
  //         batchScheduleFn: (callback) => setTimeout(callback, 1000 / 30),
  //         cacheMap: new Map(),
  //         persistCache: false,
  //       }),
  //     },
  //   },
  // });
  // const cache = new PunkerCache('punkerCache');
  // let node: Akshara;
  // let database: EthgateSolverDatabase;
  // let backend: EthgateSolver;
  // beforeAll(async () => {
  //   node = new Akshara({ chains: networks })});
  //   database = await EthgateSolverDatabase.create({ provider, cache });
  //   backend = await EthgateSolver.create({ database });
  // });
  // const query = `query TestQuery($id: ID!, $first: Int, $after: Cursor, $last: Int, $before: Cursor) {
  //   network(id: $id) {
  //     blocks(first: $first, after: $after, last: $last, before: $before) {
  //       edges { node { id, number } }
  //       pageInfo {
  //         hasNextPage
  //         hasPreviousPage
  //         startCursor
  //         endCursor
  //       }
  //     }
  //   }
  // }`;
  // let mainnet: Network;
  // let genesis: Block;
  // let second: Block;
  // let third: Block;
  // let fourth: Block;
  // let fifth: Block; // eslint-disable-line @typescript-eslint/no-unused-vars
  // let sixth: Block; // eslint-disable-line @typescript-eslint/no-unused-vars
  // let seventh: Block;
  // let eighth: Block;
  // let ninth: Block;
  // let latest: Block;
  // beforeAll(async () => {
  //   mainnet = await database.readNode<Network>('Chain:1');
  //   const makePred = (blockNumber: number) => ({
  //     type: 'Block',
  //     networkLocalId: mainnet.data.chainId,
  //     blockNumber,
  //   });
  //   // Block:1-0x997e47bf4cac509c627753c06385ac866641ec6f883734ff7944411000dc576e
  //   latest = await database.readNodeByPred<Block>(makePred(9));
  //   // Block:1-0x2ce94342df186bab4165c268c43ab982d360c9474f429fec5565adfc5d1f258b
  //   ninth = await database.readNodeByPred<Block>(makePred(8));
  //   // Block:1-0xe0c7c0b46e116b874354dce6f64b8581bd239186b03f30a978e3dc38656f723a
  //   eighth = await database.readNodeByPred<Block>(makePred(7));
  //   // Block:1-0x1f1aed8e3694a067496c248e61879cda99b0709a1dfbacd0b693750df06b326e
  //   seventh = await database.readNodeByPred<Block>(makePred(6));
  //   // Block:1-0xf37c632d361e0a93f08ba29b1a2c708d9caa3ee19d1ee8d2a02612bffe49f0a9
  //   sixth = await database.readNodeByPred<Block>(makePred(5));
  //   // Block:1-0x23adf5a3be0f5235b36941bcb29b62504278ec5b9cdfa277b992ba4a7a3cd3a2
  //   fifth = await database.readNodeByPred<Block>(makePred(4));
  //   // Block:1-0x3d6122660cc824376f11ee842f83addc3525e2dd6756b9bcf0affa6aa88cf741
  //   fourth = await database.readNodeByPred<Block>(makePred(3));
  //   // Block:1-0xb495a1d7e6663152ae92708da4843337b958146015a2802f4193a410044698c9
  //   third = await database.readNodeByPred<Block>(makePred(2));
  //   // Block:1-0x88e96d4537bea4d9c05d12549907b32561d3bf31f45aae734cdc119f13406cb6
  //   second = await database.readNodeByPred<Block>(makePred(1));
  //   // Block:1-0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3
  //   genesis = await database.readNodeByPred<Block>(makePred(0));
  // });

  // beforeEach(async () => {
  //   await cache.clear();
  //   const seed = makeDatabaseSeed();
  //   await Promise.all([
  //     ...seed[0].map((node) => cache.putNode(node)),
  //     ...seed[1].map((edge) => cache.putEdge(edge)),
  //   ]);
  //   await cache.putEdge(new NetworkBlock(mainnet.id, latest.id, latest.time));
  //   mainnetSpy.mockClear();
  // });

  // it('can get some blocks', async () => {
  //   const res = await backend.query(query, {
  //     id: mainnet.id,
  //     first: 3,
  //   });

  //   expect(res.errors).toBe(undefined);
  //   expect((res.data as any)?.network?.blocks?.edges).toHaveLength(3);
  // });
  // it('can get latest block', async () => {
  //   const res = await backend.query(query, {
  //     id: mainnet.id,
  //     first: 1,
  //   });

  //   expect(res.errors).toBe(undefined);
  //   const blocks = (res.data as any)?.network?.blocks;
  //   const nodeIds = blocks.edges.map((x: any) => x.node.id);
  //   expect(nodeIds).toEqual([latest.id]);
  //   expect(blocks.pageInfo).toMatchObject({
  //     hasNextPage: true,
  //     hasPreviousPage: false,
  //     startCursor: String(latest.time),
  //     endCursor: String(latest.time),
  //   });

  //   expect(mainnetSpy).toHaveBeenCalledTimes(1);
  // });
  // it('can paginate forward', async () => {
  //   const res = await backend.query(query, { id: mainnet.id, first: 4 });

  //   expect(res.errors).toBe(undefined);
  //   const blocks = (res.data as any)?.network?.blocks;
  //   const nodeIds = blocks.edges.map((x: any) => x.node.id);
  //   expect(nodeIds).toEqual([latest.id, ninth.id, eighth.id, seventh.id]);
  //   expect(blocks.pageInfo).toMatchObject({
  //     hasNextPage: true,
  //     hasPreviousPage: false,
  //     startCursor: String(latest.time),
  //     endCursor: String(seventh.time),
  //   });

  //   expect(mainnetSpy).toHaveBeenCalledTimes(1);
  // });
  // it('can paginate forward with cursor', async () => {
  //   const res = await backend.query(query, {
  //     id: mainnet.id,
  //     first: 10,
  //     after: String(latest.time),
  //     before: String(seventh.time),
  //   });

  //   expect(res.errors).toBe(undefined);
  //   const blocks = (res.data as any)?.network?.blocks;
  //   const nodeIds = blocks.edges.map((x: any) => x.node.id);
  //   expect(nodeIds).toEqual([ninth.id, eighth.id]);
  //   expect(blocks.pageInfo).toMatchObject({
  //     hasNextPage: true,
  //     hasPreviousPage: true,
  //     startCursor: String(ninth.time),
  //     endCursor: String(eighth.time),
  //   });

  //   expect(mainnetSpy).toHaveBeenCalledTimes(1);
  // });
  // it('can get genesis', async () => {
  //   const res = await backend.query(query, {
  //     id: mainnet.id,
  //     last: 1,
  //   });

  //   expect(res.errors).toBe(undefined);
  //   const blocks = (res.data as any)?.network?.blocks;
  //   const nodeIds = blocks.edges.map((x: any) => x.node.id);
  //   expect(nodeIds).toEqual([genesis.id]);
  //   expect(blocks.pageInfo).toMatchObject({
  //     hasNextPage: false,
  //     hasPreviousPage: true,
  //     startCursor: String(genesis.time),
  //     endCursor: String(genesis.time),
  //   });

  //   expect(mainnetSpy).toHaveBeenCalledTimes(1);
  // });
  // it('can paginate backward', async () => {
  //   const res = await backend.query(query, { id: mainnet.id, last: 4 });

  //   expect(res.errors).toBe(undefined);
  //   const blocks = (res.data as any)?.network?.blocks;
  //   const nodeIds = blocks.edges.map((x: any) => x.node.id);
  //   expect(nodeIds).toEqual([genesis.id, second.id, third.id, fourth.id]);
  //   expect(blocks.pageInfo).toMatchObject({
  //     hasNextPage: false,
  //     hasPreviousPage: true,
  //     startCursor: String(genesis.time),
  //     endCursor: String(fourth.time),
  //   });

  //   expect(mainnetSpy).toHaveBeenCalledTimes(1);
  // });
  // it('can paginate backward with cursor', async () => {
  //   const res = await backend.query(query, {
  //     id: mainnet.id,
  //     last: 10,
  //     before: String(genesis.time),
  //     after: String(fourth.time),
  //   });

  //   expect(res.errors).toBe(undefined);
  //   const blocks = (res.data as any)?.network?.blocks;
  //   const nodeIds = blocks.edges.map((x: any) => x.node.id);
  //   expect(nodeIds).toEqual([second.id, third.id]);
  //   expect(blocks.pageInfo).toMatchObject({
  //     hasNextPage: true,
  //     hasPreviousPage: true,
  //     startCursor: String(second.time),
  //     endCursor: String(third.time),
  //   });

  //   expect(mainnetSpy).toHaveBeenCalledTimes(1);
  // });
  it("can do subscriptions", async () => {
    const solver = await EthgateSolver.create({ node });
    const results = await solver.subscribe(`subscription { greetings }`, {});

    const resultsArray = await firstValueFrom(results.pipe(toArray()));
    expect(resultsArray).toMatchInlineSnapshot(`
      [
        {
          "data": {
            "greetings": "Hi",
          },
        },
        {
          "data": {
            "greetings": "Bonjour",
          },
        },
        {
          "data": {
            "greetings": "Hola",
          },
        },
        {
          "data": {
            "greetings": "Ciao",
          },
        },
        {
          "data": {
            "greetings": "Zdravo",
          },
        },
      ]
    `);
  });
});
