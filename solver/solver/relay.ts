import type { EnvironmentConfig } from 'relay-runtime';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import type { Solver } from './solver';

export const createRelayNetwork = (solver: Solver) => {
  const network = Network.create(async (operation, variables) => {
    const result = await solver.query(operation.text!, variables);

    if (result.errors) {
      result.errors.map((error) => {
        console.error(error);
      });
    }

    return result as any;
  });
  return network;
};

export type RelayEnvironmentConfig = { solver: Solver } & Pick<EnvironmentConfig, 'isServer'>;
export const createRelayEnvironment = (config: RelayEnvironmentConfig) => {
  const store = new Store(RecordSource.create());
  const network = createRelayNetwork(config.solver);
  const environment = new Environment({
    network,
    store,
    isServer: config.isServer,
  });
  return environment;
};
