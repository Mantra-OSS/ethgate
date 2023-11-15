/**
 * @generated SignedSource<<805278b8427f38a3d9ff11b2c4c6e50c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
export type schemaTestNodeChainChainHasBlockConnectionQuery$variables = {
  id: GlobalId;
};
export type schemaTestNodeChainChainHasBlockConnectionQuery$data = {
  readonly node: {
    readonly connection: {
      readonly edges: ReadonlyArray<{
        readonly head: {
          readonly id: GlobalId;
        };
      }>;
    };
    readonly id: GlobalId;
  } | null | undefined;
};
export type schemaTestNodeChainChainHasBlockConnectionQuery = {
  response: schemaTestNodeChainChainHasBlockConnectionQuery$data;
  variables: schemaTestNodeChainChainHasBlockConnectionQuery$variables;
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
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  },
  {
    "kind": "Literal",
    "name": "type",
    "value": "ChainHasBlock"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "schemaTestNodeChainChainHasBlockConnectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "connection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "head",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "connection(first:1,type:\"ChainHasBlock\")"
          }
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
    "name": "schemaTestNodeChainChainHasBlockConnectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "connection",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "head",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "connection(first:1,type:\"ChainHasBlock\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "df02fb50bd61c2262a2e9ac7ae762efa",
    "id": null,
    "metadata": {},
    "name": "schemaTestNodeChainChainHasBlockConnectionQuery",
    "operationKind": "query",
    "text": "query schemaTestNodeChainChainHasBlockConnectionQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    connection(type: \"ChainHasBlock\", first: 1) {\n      __typename\n      edges {\n        __typename\n        head {\n          __typename\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fc99b1a46bf5aad689f8df6e5e506076";

export default node;
