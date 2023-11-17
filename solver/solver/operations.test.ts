import type { schemaTestNodeChainChainHasBlockConnectionQuery } from '@/__generated__/schemaTestNodeChainChainHasBlockConnectionQuery.graphql';
import type { schemaTestNodeChainQuery } from '@/__generated__/schemaTestNodeChainQuery.graphql';
import type { schemaTestNodeExplorerQuery } from '@/__generated__/schemaTestNodeExplorerQuery.graphql';
import type { schemaTestRootQuery } from '@/__generated__/schemaTestRootQuery.graphql';
import { describe, expect, it } from '@jest/globals';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { print } from 'graphql';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fetchQuery, graphql } from 'relay-runtime';

import { AksharaDatabase } from '../../akshara/database';
import { Akshara } from '../../akshara/node';
import { ETHGATE_NODE_TEST_CHAINS } from '../../akshara/testing';

import { createSolverOperations } from './operations';
import { createRelayEnvironment } from './relay';
import { createSolverSchema } from './schema';
import { Solver, SolverGraph } from './solver';

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

  // A hack to dump the latest operations
  it('can dump operations', async () => {
    const graph = new SolverGraph();
    const operations = createSolverOperations(graph);
    const printed = print(operations);

    const platformPath = process.platform === 'win32' ? 'file:///' : 'file://';
    const path = resolve(
      import.meta.url.replace(platformPath, ''),
      '../../../solver-operations.graphql',
    );
    await writeFile(path, printed + '\n');
  });
});
