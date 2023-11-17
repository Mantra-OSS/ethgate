/**
 * @generated SignedSource<<72d2fe60ae8dd1715661334ddb0be750>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { GlobalId } from "@/lib-solver";
export type ConnectionListPaginationQuery$variables = {
  after?: string | null | undefined;
  edgeTypeName: string;
  first: number;
  id: GlobalId;
};
export type ConnectionListPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"ConnectionList_node">;
  } | null | undefined;
};
export type ConnectionListPaginationQuery = {
  response: ConnectionListPaginationQuery$data;
  variables: ConnectionListPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "edgeTypeName"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
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
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v3 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
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
      "name": "slug",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v7 = [
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "kind": "Variable",
    "name": "type",
    "variableName": "edgeTypeName"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ConnectionListPaginationQuery",
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
            "args": [
              (v2/*: any*/),
              {
                "kind": "Variable",
                "name": "edgeTypeName",
                "variableName": "edgeTypeName"
              },
              (v3/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConnectionListPaginationQuery",
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
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isNode"
          },
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": (v7/*: any*/),
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
                      (v4/*: any*/),
                      (v6/*: any*/),
                      (v5/*: any*/)
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
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
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
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
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
    "cacheID": "68398223295b76ce11a3f31e2786a25f",
    "id": null,
    "metadata": {},
    "name": "ConnectionListPaginationQuery",
    "operationKind": "query",
    "text": "query ConnectionListPaginationQuery(\n  $after: String\n  $edgeTypeName: String!\n  $first: Int!\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...ConnectionList_node_3wPyRw\n    id\n  }\n}\n\nfragment ConnectionListItem_edge on Edge {\n  __isEdge: __typename\n  headId\n  tail {\n    __typename\n    meta {\n      slug\n    }\n    id\n  }\n  node {\n    __typename\n    id\n    meta {\n      slug\n    }\n    data\n  }\n}\n\nfragment ConnectionList_node_3wPyRw on Node {\n  __isNode: __typename\n  id\n  meta {\n    slug\n  }\n  connection(type: $edgeTypeName, first: $first, after: $after) {\n    __typename\n    edges {\n      __typename\n      ...ConnectionListItem_edge\n      headId\n      __isEdge: __typename\n      cursor\n      node {\n        __typename\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1c1196c0c93b9300a0905e6e87b40413";

export default node;
