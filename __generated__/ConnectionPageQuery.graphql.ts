/**
 * @generated SignedSource<<d1b59f55f506b0f8e150138fe2c29635>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { GlobalId } from "@/lib-solver";
export type ConnectionPageQuery$variables = {
  edgeTypeName: string;
  nodeId: GlobalId;
};
export type ConnectionPageQuery$data = {
  readonly node: {
    readonly id: GlobalId;
    readonly meta: {
      readonly name: string;
    };
    readonly " $fragmentSpreads": FragmentRefs<"ConnectionPageOverview_node" | "NodeAvatar_node">;
  } | null | undefined;
};
export type ConnectionPageQuery = {
  response: ConnectionPageQuery$data;
  variables: ConnectionPageQuery$variables;
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
  "name": "nodeId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "nodeId"
  }
],
v3 = {
  "kind": "Literal",
  "name": "first",
  "value": 20
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
  "name": "slug",
  "storageKey": null
},
v8 = [
  (v3/*: any*/),
  {
    "kind": "Variable",
    "name": "type",
    "variableName": "edgeTypeName"
  }
],
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "NodeMeta",
  "kind": "LinkedField",
  "name": "meta",
  "plural": false,
  "selections": [
    (v7/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConnectionPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NodeAvatar_node"
          },
          {
            "args": [
              {
                "kind": "Variable",
                "name": "edgeTypeName",
                "variableName": "edgeTypeName"
              },
              (v3/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ConnectionPageOverview_node"
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "NodeMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              (v5/*: any*/)
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ConnectionPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isNode"
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "NodeMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v8/*: any*/),
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
                      (v9/*: any*/),
                      (v4/*: any*/)
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
                      (v4/*: any*/),
                      (v9/*: any*/),
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
            "args": (v8/*: any*/),
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
    "cacheID": "99be5c1010835ae2e4d7c23cf078ccf0",
    "id": null,
    "metadata": {},
    "name": "ConnectionPageQuery",
    "operationKind": "query",
    "text": "query ConnectionPageQuery(\n  $nodeId: ID!\n  $edgeTypeName: String!\n) {\n  node(id: $nodeId) {\n    __typename\n    ...NodeAvatar_node\n    ...ConnectionPageOverview_node_3T3Zpf\n    id\n    meta {\n      name\n    }\n  }\n}\n\nfragment ConnectionListItem_edge on Edge {\n  __isEdge: __typename\n  headId\n  tail {\n    __typename\n    meta {\n      slug\n    }\n    id\n  }\n  node {\n    __typename\n    id\n    meta {\n      slug\n    }\n    data\n  }\n}\n\nfragment ConnectionList_node_3T3Zpf on Node {\n  __isNode: __typename\n  id\n  meta {\n    slug\n  }\n  connection(type: $edgeTypeName, first: 20) {\n    __typename\n    edges {\n      __typename\n      ...ConnectionListItem_edge\n      headId\n      __isEdge: __typename\n      cursor\n      node {\n        __typename\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ConnectionPageOverview_node_3T3Zpf on Node {\n  __isNode: __typename\n  ...ConnectionList_node_3T3Zpf\n  id\n  meta {\n    slug\n  }\n}\n\nfragment NodeAvatar_node on Node {\n  __isNode: __typename\n  __typename\n  id\n  meta {\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "0fe722097676ab15632aa2acade24334";

export default node;
