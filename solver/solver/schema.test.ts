import type { schemaTestNodeChainChainHasBlockConnectionQuery } from '@/__generated__/schemaTestNodeChainChainHasBlockConnectionQuery.graphql';
import type { schemaTestNodeChainQuery } from '@/__generated__/schemaTestNodeChainQuery.graphql';
import type { schemaTestNodeExplorerQuery } from '@/__generated__/schemaTestNodeExplorerQuery.graphql';
import type { schemaTestRootQuery } from '@/__generated__/schemaTestRootQuery.graphql';
import { describe, expect, it } from '@jest/globals';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { printSchema } from 'graphql';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchQuery, graphql } from 'relay-runtime';

import { AksharaDatabase } from '../../akshara/database';
import { Akshara } from '../../akshara/node';
import { ETHGATE_NODE_TEST_CHAINS } from '../../akshara/testing';

import { createRelayEnvironment } from './relay';
import { createSolverSchema } from './schema';
import { Solver, SolverGraph } from './solver';

const projectRoot = resolve(fileURLToPath(import.meta.url), '../../../');

describe('SolverSchema', () => {
  let solver: Solver;
  beforeEach(() => {
    const chains = ETHGATE_NODE_TEST_CHAINS;
    const fetchFn = fetch;
    const database = new AksharaDatabase({
      name: 'test',
      indexedDB: new IDBFactory(),
      IDBKeyRange: IDBKeyRange,
    });
    const node = new Akshara({ chains, fetchFn, database, daBatchScheduleFn: undefined as any });
    solver = new Solver({
      node,
    });
  });

  // A hack to dump the latest schema to data/schema.graphql
  it('can dump schema', async () => {
    const graph = new SolverGraph();
    const schema = createSolverSchema(graph);
    const printed = printSchema(schema);

    const path = resolve(projectRoot, './solver.graphql');
    await writeFile(path, printed + '\n');
  });

  it('can fetch Query.root', async () => {
    const environment = createRelayEnvironment({ solver, isServer: true });
    const resultObservable = fetchQuery<schemaTestRootQuery>(
      environment,
      graphql`
        query schemaTestRootQuery {
          root {
            id
          }
        }
      `,
      {},
    );
    const result = await resultObservable.toPromise();
    expect(result?.root?.id).toBe('Explorer:');
  });

  it('can fetch Query.node(id: "Explorer:")', async () => {
    const environment = createRelayEnvironment({ solver, isServer: true });
    const resultObservable = fetchQuery<schemaTestNodeExplorerQuery>(
      environment,
      graphql`
        query schemaTestNodeExplorerQuery($id: ID!) {
          node(id: $id) {
            id
          }
        }
      `,
      { id: 'Explorer:' },
    );
    const result = await resultObservable.toPromise();
    expect(result?.node?.id).toBe('Explorer:');
  });

  it('can fetch Query.node(id: "Chain:1")', async () => {
    const environment = createRelayEnvironment({ solver, isServer: true });
    const resultObservable = fetchQuery<schemaTestNodeChainQuery>(
      environment,
      graphql`
        query schemaTestNodeChainQuery($id: ID!) {
          node(id: $id) {
            id
          }
        }
      `,
      { id: 'Chain:1' },
    );
    const result = await resultObservable.toPromise();
    expect(result?.node?.id).toBe('Chain:1');
  });

  it('can fetch Query.node(id: "Chain:1").connection(type: "ChainHasBlock", first: 1)', async () => {
    const environment = createRelayEnvironment({ solver, isServer: true });
    const resultObservable = fetchQuery<schemaTestNodeChainChainHasBlockConnectionQuery>(
      environment,
      graphql`
        query schemaTestNodeChainChainHasBlockConnectionQuery($id: ID!) {
          node(id: $id) {
            id
            connection(type: "ChainHasBlock", first: 1) {
              edges {
                head {
                  id
                }
              }
            }
          }
        }
      `,
      { id: 'Chain:1' },
    );
    const result = await resultObservable.toPromise();
    expect(result?.node?.id).toBe('Chain:1');
    // expect(result?.node?.connection.edges).toHaveLength(1);
  });
});
