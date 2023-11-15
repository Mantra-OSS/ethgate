/**
 * @generated SignedSource<<2f1150d6657be0c0c9c03f6bf20abfd2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
export type schemaTestNodeExplorerQuery$variables = {
  id: GlobalId;
};
export type schemaTestNodeExplorerQuery$data = {
  readonly node: {
    readonly id: GlobalId;
  } | null | undefined;
};
export type schemaTestNodeExplorerQuery = {
  response: schemaTestNodeExplorerQuery$data;
  variables: schemaTestNodeExplorerQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "schemaTestNodeExplorerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "schemaTestNodeExplorerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "15ba48582733071fc0a7aa59069a4a39",
    "id": null,
    "metadata": {},
    "name": "schemaTestNodeExplorerQuery",
    "operationKind": "query",
    "text": "query schemaTestNodeExplorerQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c8194b2c9bbfadd536123e113a3351be";

export default node;
