/**
 * @generated SignedSource<<f435b323dc38bac44e009ce1fef4a6eb>>
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
        readonly node: {
          readonly id: GlobalId;
          readonly " $fragmentSpreads": FragmentRefs<"HomeViewChain_chain">;
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
  "name": "id",
  "storageKey": null
},
v1 = {
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Chain",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "HomeViewChain_chain"
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Chain",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
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
                        "args": [
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
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "connection",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              (v1/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v1/*: any*/),
                                  (v0/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "data",
                                    "storageKey": null
                                  }
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
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b3c80d36a9e7600f7679e2dc79f5a63d",
    "id": null,
    "metadata": {},
    "name": "HomeViewQuery",
    "operationKind": "query",
    "text": "query HomeViewQuery {\n  root {\n    chains {\n      edges {\n        node {\n          id\n          ...HomeViewChain_chain\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment HomeViewChain_chain on Chain {\n  id\n  meta {\n    name\n    slug\n  }\n  connection(type: \"ChainHasBlock\", first: 1) {\n    __typename\n    edges {\n      __typename\n      node {\n        __typename\n        id\n        data\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e70a956b40950a1c62078fde5eced95b";

export default node;
