import type { schemaTestNodeChainChainHasBlockConnectionQuery } from '@/__generated__/schemaTestNodeChainChainHasBlockConnectionQuery.graphql';
import type { schemaTestNodeChainQuery } from '@/__generated__/schemaTestNodeChainQuery.graphql';
import type { schemaTestNodeExplorerQuery } from '@/__generated__/schemaTestNodeExplorerQuery.graphql';
import type { schemaTestRootQuery } from '@/__generated__/schemaTestRootQuery.graphql';
import { codegen } from '@graphql-codegen/core';
import * as typescriptPlugin from '@graphql-codegen/typescript';
import * as typescriptGenericSdkPlugin from '@graphql-codegen/typescript-generic-sdk';
import * as typescriptOperationsPlugin from '@graphql-codegen/typescript-operations';
import { describe, expect, it } from '@jest/globals';
import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';
import { parse, print, printSchema } from 'graphql';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchQuery, graphql } from 'relay-runtime';

import { AksharaDatabase } from '../../akshara/database';
import { Akshara } from '../../akshara/node';
import { ETHGATE_NODE_TEST_CHAINS } from '../../akshara/testing';

import { createSolverOperations } from './operations';
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

  // A hack to dump the latest operations
  it('can dump operations', async () => {
    const graph = new SolverGraph();
    const operations = createSolverOperations(graph);

    const path = resolve(projectRoot, './solver/solver/sdk.ts');

    const printed = await codegen({
      schema: parse(printSchema(createSolverSchema(graph))),
      documents: [
        {
          document: operations,
        },
      ],
      filename: path,
      config: {
        useTypeImports: true,
        emitLegacyCommonJSImports: false,
        rawRequest: true,
        // gqlImport: 'relay-runtime#graphql',
      },
      plugins: [
        {
          typescript: {},
        },
        {
          typescriptOperations: {},
        },
        {
          typescriptGenericSdk: {},
        },
      ],
      pluginMap: {
        typescript: typescriptPlugin,
        typescriptOperations: typescriptOperationsPlugin,
        typescriptGenericSdk: typescriptGenericSdkPlugin,
      },
    });

    await writeFile(
      path,
      `/* eslint-disable @typescript-eslint/naming-convention */\n` + printed + '\n',
    );
  });
});
