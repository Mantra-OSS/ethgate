/**
 * @generated SignedSource<<b66452e933e2ec81866f3a50a4e6fe50>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { GlobalId } from "@/lib-solver";
export type NodePageQuery$variables = {
  nodeId: GlobalId;
};
export type NodePageQuery$data = {
  readonly node: {
    readonly data: any;
    readonly id: GlobalId;
    readonly meta: {
      readonly name: string;
    };
    readonly " $fragmentSpreads": FragmentRefs<"NodeAvatar_node" | "NodePageConnectionSection_node" | "NodePageOverview_node">;
  } | null | undefined;
};
export type NodePageQuery = {
  response: NodePageQuery$data;
  variables: NodePageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "nodeId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "nodeId"
  }
],
v2 = {
  "kind": "Literal",
  "name": "first",
  "value": 20
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
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
  "kind": "TypeDiscriminator",
  "abstractKey": "__isNode"
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
    (v4/*: any*/),
    (v8/*: any*/)
  ],
  "storageKey": null
},
v10 = [
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "type",
    "value": "ChainHasBlock"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NodePageQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "NodePageOverview_node"
          },
          {
            "args": [
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "ChainHasBlock"
              },
              (v2/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "NodePageConnectionSection_node"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NodeAvatar_node"
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "NodeMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
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
    "name": "NodePageQuery",
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
          (v7/*: any*/),
          (v3/*: any*/),
          (v9/*: any*/),
          (v5/*: any*/),
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
                      (v6/*: any*/),
                      {
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
                      (v3/*: any*/)
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
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v3/*: any*/),
                      (v9/*: any*/),
                      (v5/*: any*/)
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
              }
            ],
            "storageKey": "connection(first:20,type:\"ChainHasBlock\")"
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
    "cacheID": "607ae0d03b0ce668bce2e8103d7b3fb8",
    "id": null,
    "metadata": {},
    "name": "NodePageQuery",
    "operationKind": "query",
    "text": "query NodePageQuery(\n  $nodeId: ID!\n) {\n  node(id: $nodeId) {\n    __typename\n    ...NodePageOverview_node\n    ...NodePageConnectionSection_node_VSGbW\n    ...NodeAvatar_node\n    id\n    meta {\n      name\n    }\n    data\n  }\n}\n\nfragment ConnectionListItem_edge on Edge {\n  __isEdge: __typename\n  headId\n  tail {\n    __typename\n    meta {\n      slug\n    }\n    id\n  }\n  node {\n    __typename\n    ...NodeAvatar_node\n    id\n    meta {\n      slug\n    }\n    data\n  }\n}\n\nfragment ConnectionList_node_VSGbW on Node {\n  __isNode: __typename\n  id\n  meta {\n    slug\n  }\n  connection(type: \"ChainHasBlock\", first: 20) {\n    __typename\n    edges {\n      __typename\n      ...ConnectionListItem_edge\n      headId\n      __isEdge: __typename\n      cursor\n      node {\n        __typename\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment NodeAvatar_node on Node {\n  __isNode: __typename\n  __typename\n  id\n  meta {\n    name\n  }\n}\n\nfragment NodePageConnectionSection_node_VSGbW on Node {\n  __isNode: __typename\n  ...ConnectionList_node_VSGbW\n  id\n  meta {\n    slug\n  }\n}\n\nfragment NodePageOverview_node on Node {\n  __isNode: __typename\n  __typename\n  id\n  meta {\n    name\n    slug\n  }\n  data\n}\n"
  }
};
})();

(node as any).hash = "d305ae57e2e588382cecbd529b04c03e";

export default node;
