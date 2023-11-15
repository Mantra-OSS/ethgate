import type {
  ExecuteFunction,
  FetchFunction,
  GraphQLResponse,
  SubscribeFunction,
} from 'relay-runtime';
import {
  Environment,
  Network,
  RecordSource,
  Observable as RelayObservable,
  Store,
} from 'relay-runtime';
import type { Observable } from 'rxjs';
import { from, mergeMap, tap } from 'rxjs';

import { useSolver } from './backend';

// import { PunkerBackendClient } from './backend.js';

const DEBUG_RESULTS = false;

class PunkerRelayNetwork implements ReturnType<typeof Network.create> {
  // #backend: PunkerBackendClient;

  // constructor() {
  //   this.#backend = new PunkerBackendClient();
  // }

  query: FetchFunction = async (request, variables) => {
    const result = await useSolver().query(request.text!, variables);

    if (DEBUG_RESULTS) {
      console.debug(result);
    }

    // TODO: Handle errors
    if (result.errors) {
      result.errors.map((error) => {
        console.error(error);
      });
    }

    return result as any;
  };

  subscribe: SubscribeFunction = (request, variables) => {
    const results = from(useSolver().subscribe(request.text!, variables)).pipe(
      mergeMap((result) => result),
    ) as Observable<GraphQLResponse>;

    return RelayObservable.create<GraphQLResponse>((subscriber) =>
      results
        .pipe(
          // TODO: Do not tap if DEBUG_RESULTS is false
          tap((result) => {
            if (DEBUG_RESULTS) {
              console.log(result);
            }
          }),
        )
        .subscribe(subscriber),
    );
  };

  execute: ExecuteFunction = Network.create(this.query, this.subscribe).execute;
}

const network = new PunkerRelayNetwork();
const store = new Store(new RecordSource());

class PunkerRelayEnvironment extends Environment {
  #network: PunkerRelayNetwork;

  constructor() {
    super({ network, store });
    this.#network = network;
  }

  getNetwork() {
    return this.#network;
  }
}

const relayEnvironment = new PunkerRelayEnvironment();

export default relayEnvironment;
