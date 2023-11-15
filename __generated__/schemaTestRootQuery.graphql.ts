/**
 * @generated SignedSource<<64e1dcc218724277ff6d2380f5456169>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
export type schemaTestRootQuery$variables = Record<PropertyKey, never>;
export type schemaTestRootQuery$data = {
  readonly root: {
    readonly id: GlobalId;
  };
};
export type schemaTestRootQuery = {
  response: schemaTestRootQuery$data;
  variables: schemaTestRootQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Explorer",
    "kind": "LinkedField",
    "name": "root",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "schemaTestRootQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "schemaTestRootQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "56065bf323c599e43e1135901eeacd92",
    "id": null,
    "metadata": {},
    "name": "schemaTestRootQuery",
    "operationKind": "query",
    "text": "query schemaTestRootQuery {\n  root {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c03ab2381b44d595162d0174150b1470";

export default node;
