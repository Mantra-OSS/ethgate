/**
 * @generated SignedSource<<2d2d93379a82b807517f25e2a67c365f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { GlobalId } from "@/lib-solver";
export type HomeViewQuery$variables = Record<PropertyKey, never>;
export type HomeViewQuery$data = {
  readonly root: {
    readonly chains: {
      readonly edges: ReadonlyArray<{
        readonly headId: GlobalId;
        readonly node: {
          readonly " $fragmentSpreads": FragmentRefs<"HomeViewChain_node">;
        };
      }>;
    };
  };
};
export type HomeViewQuery = {
  response: HomeViewQuery$data;
  variables: HomeViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headId",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeViewQuery",
    "selections": [
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
            "concreteType": "ExplorerHasChainConnection",
            "kind": "LinkedField",
            "name": "chains",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ExplorerHasChainEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Chain",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "HomeViewChain_node"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeViewQuery",
    "selections": [
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
            "concreteType": "ExplorerHasChainConnection",
            "kind": "LinkedField",
            "name": "chains",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ExplorerHasChainEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Chain",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
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
                      {
                        "alias": null,
                        "args": (v2/*: any*/),
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "connection",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v3/*: any*/),
                                  (v1/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "data",
                                        "storageKey": null
                                      }
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "cursor",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
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
                          {
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
                          }
                        ],
                        "storageKey": "connection(first:1,type:\"ChainHasBlock\")"
                      },
                      {
                        "alias": null,
                        "args": (v2/*: any*/),
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
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "33360c49cfe3088aa51ed7dd14c5dd30",
    "id": null,
    "metadata": {},
    "name": "HomeViewQuery",
    "operationKind": "query",
    "text": "query HomeViewQuery {\n  root {\n    chains {\n      edges {\n        headId\n        node {\n          ...HomeViewChain_node\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment HomeViewChain_node on Chain {\n  id\n  meta {\n    name\n    slug\n  }\n  connection(type: \"ChainHasBlock\", first: 1) {\n    __typename\n    edges {\n      __typename\n      node {\n        __typename\n        ... on Block {\n          id\n          data\n        }\n        id\n      }\n      __isEdge: __typename\n      cursor\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b9f7e981c3bf352a3d20d1e2966108e0";

export default node;
