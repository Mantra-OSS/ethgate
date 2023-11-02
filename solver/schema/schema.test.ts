import { describe, expect, it } from '@jest/globals';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { EthgateSolverSchema } from './schema.js';

describe('PunkerSchema', () => {
  it.skip('has the same print', async () => {
    const schema = new EthgateSolverSchema();
    const printed = schema.print();

    expect(printed).toMatchSnapshot();
  });
  // A hack to dump the latest schema to data/schema.graphql
  it('can dump schema', async () => {
    const schema = new EthgateSolverSchema();
    const printed = schema.print();

    const platformPath = process.platform === 'win32' ? 'file:///' : 'file://';
    const path = resolve(
      import.meta.url.replace(platformPath, ''),
      '../../../../../apps/explorer/data/schema.graphql',
    );
    await writeFile(path, printed + '\n');
  });
});
