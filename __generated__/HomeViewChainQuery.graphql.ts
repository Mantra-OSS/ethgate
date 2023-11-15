/**
 * @generated SignedSource<<5e1c8525b2877473756829a868d8a3d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
export type HomeViewChainQuery$variables = {
  chainId: GlobalId;
};
export type HomeViewChainQuery$data = {
  readonly node: {
    readonly connection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly data: any;
          readonly id: GlobalId;
        };
      }>;
    };
    readonly id: GlobalId;
    readonly meta: {
      readonly name: string;
      readonly slug: string;
    };
  } | null | undefined;
};
export type HomeViewChainQuery = {
  response: HomeViewChainQuery$data;
  variables: HomeViewChainQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "chainId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "chainId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "NodeMeta",
  "kind": "LinkedField",
  "name": "meta",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = [
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "data",
  "storageKey": null
},
v6 = {
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
    "name": "HomeViewChainQuery",
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
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
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v5/*: any*/)
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
    "name": "HomeViewChainQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "connection",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v2/*: any*/),
                      (v5/*: any*/)
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
    "cacheID": "e2215325686e9682091a7988f90cf0a6",
    "id": null,
    "metadata": {},
    "name": "HomeViewChainQuery",
    "operationKind": "query",
    "text": "query HomeViewChainQuery(\n  $chainId: ID!\n) {\n  node(id: $chainId) {\n    __typename\n    id\n    meta {\n      name\n      slug\n    }\n    connection(type: \"ChainHasBlock\", first: 1) {\n      __typename\n      edges {\n        __typename\n        node {\n          __typename\n          id\n          data\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2ceed8dbba0f32386c6234ec6b7f94ca";

export default node;
