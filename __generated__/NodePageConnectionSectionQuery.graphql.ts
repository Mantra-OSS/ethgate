/**
 * @generated SignedSource<<9fd947aee4b21d73cb2dc8f6f24468e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { GlobalId } from "@/lib-solver";
export type NodePageConnectionSectionQuery$variables = {
  edgeTypeName: string;
  first: number;
  nodeId: GlobalId;
};
export type NodePageConnectionSectionQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"ConnectionList_node">;
  } | null | undefined;
};
export type NodePageConnectionSectionQuery = {
  response: NodePageConnectionSectionQuery$data;
  variables: NodePageConnectionSectionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "edgeTypeName"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "nodeId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "nodeId"
  }
],
v4 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isNode"
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "NodeMeta",
  "kind": "LinkedField",
  "name": "meta",
  "plural": false,
  "selections": [
    (v8/*: any*/)
  ],
  "storageKey": null
},
v10 = [
  (v4/*: any*/),
  {
    "kind": "Variable",
    "name": "type",
    "variableName": "edgeTypeName"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NodePageConnectionSectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "edgeTypeName",
                "variableName": "edgeTypeName"
              },
              (v4/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ConnectionList_node"
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "NodePageConnectionSectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": (v10/*: any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "connection",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  {
                    "kind": "TypeDiscriminator",
                    "abstractKey": "__isEdge"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "headId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "tail",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v9/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
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
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "data",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
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
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v10/*: any*/),
            "filters": [
              "type"
            ],
            "handle": "connection",
            "key": "ConnectionList_connection",
            "kind": "LinkedHandle",
            "name": "connection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ed38beee91ffda2f7f965ffb866fe61f",
    "id": null,
    "metadata": {},
    "name": "NodePageConnectionSectionQuery",
    "operationKind": "query",
    "text": "query NodePageConnectionSectionQuery(\n  $nodeId: ID!\n  $edgeTypeName: String!\n  $first: Int!\n) {\n  node(id: $nodeId) {\n    __typename\n    ...ConnectionList_node_AD8yY\n    id\n  }\n}\n\nfragment ConnectionListItem_edge on Edge {\n  __isEdge: __typename\n  headId\n  tail {\n    __typename\n    meta {\n      slug\n    }\n    id\n  }\n  node {\n    __typename\n    ...NodeAvatar_node\n    id\n    meta {\n      slug\n    }\n    data\n  }\n}\n\nfragment ConnectionList_node_AD8yY on Node {\n  __isNode: __typename\n  id\n  meta {\n    slug\n  }\n  connection(type: $edgeTypeName, first: $first) {\n    __typename\n    edges {\n      __typename\n      ...ConnectionListItem_edge\n      headId\n      __isEdge: __typename\n      cursor\n      node {\n        __typename\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment NodeAvatar_node on Node {\n  __isNode: __typename\n  __typename\n  id\n  meta {\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "db02a3f5f63c4ce5b44a2fd01e7d6c22";

export default node;
