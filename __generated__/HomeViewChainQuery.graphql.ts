/**
 * @generated SignedSource<<46df1738dfc42a37e043343a31d7f3cf>>
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
      readonly __id: GlobalId;
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly data?: any;
          readonly id?: GlobalId;
        };
      }>;
      readonly pageInfo: {
        readonly startCursor: string | null | undefined;
      };
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
v4 = {
  "kind": "Literal",
  "name": "type",
  "value": "ChainHasBlock"
},
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
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
},
v10 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  },
  (v4/*: any*/)
];
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
            "alias": "connection",
            "args": [
              (v4/*: any*/)
            ],
            "concreteType": null,
            "kind": "LinkedField",
            "name": "__HomeViewChainQuery_connection_connection",
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
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v5/*: any*/)
                        ],
                        "type": "Block",
                        "abstractKey": null
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/),
              (v9/*: any*/)
            ],
            "storageKey": "__HomeViewChainQuery_connection_connection(type:\"ChainHasBlock\")"
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
            "args": (v10/*: any*/),
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
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v5/*: any*/)
                        ],
                        "type": "Block",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "TypeDiscriminator",
                    "abstractKey": "__isEdge"
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/),
              (v9/*: any*/)
            ],
            "storageKey": "connection(first:1,type:\"ChainHasBlock\")"
          },
          {
            "alias": null,
            "args": (v10/*: any*/),
            "filters": [
              "type"
            ],
            "handle": "connection",
            "key": "HomeViewChainQuery_connection",
            "kind": "LinkedHandle",
            "name": "connection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "06d0cd71a237f422da181b669296095d",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "node",
            "connection"
          ]
        }
      ]
    },
    "name": "HomeViewChainQuery",
    "operationKind": "query",
    "text": "query HomeViewChainQuery(\n  $chainId: ID!\n) {\n  node(id: $chainId) {\n    __typename\n    id\n    meta {\n      name\n      slug\n    }\n    connection(type: \"ChainHasBlock\", first: 1) {\n      __typename\n      edges {\n        __typename\n        node {\n          __typename\n          ... on Block {\n            id\n            data\n          }\n          id\n        }\n        __isEdge: __typename\n        cursor\n      }\n      pageInfo {\n        startCursor\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "287956cbd6c4a56f2bd6e92a9185faad";

export default node;
