/**
 * @generated SignedSource<<2d0285e1788684b0c8cc4de199dedfe1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { GlobalId } from "@/lib-solver";
export type ConnectionListSubscriptionQuery$variables = {
  before?: string | null | undefined;
  connection: GlobalId;
  nodeId: GlobalId;
  type: string;
};
export type ConnectionListSubscriptionQuery$data = {
  readonly node_connection: {
    readonly edges: ReadonlyArray<{
      readonly headId: GlobalId;
      readonly " $fragmentSpreads": FragmentRefs<"ConnectionListItem_edge">;
    }>;
  } | null | undefined;
};
export type ConnectionListSubscriptionQuery = {
  response: ConnectionListSubscriptionQuery$data;
  variables: ConnectionListSubscriptionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "before"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connection"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "nodeId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "type"
},
v4 = [
  {
    "kind": "Variable",
    "name": "before",
    "variableName": "before"
  },
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "nodeId"
  },
  {
    "kind": "Variable",
    "name": "type",
    "variableName": "type"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headId",
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
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConnectionListSubscriptionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "NodeConnectionSubscription",
        "kind": "LinkedField",
        "name": "node_connection",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "ConnectionListItem_edge"
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "ConnectionListSubscriptionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "NodeConnectionSubscription",
        "kind": "LinkedField",
        "name": "node_connection",
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
              (v6/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isEdge"
              },
              (v5/*: any*/),
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
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
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
                  {
                    "kind": "TypeDiscriminator",
                    "abstractKey": "__isNode"
                  },
                  (v8/*: any*/),
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
                      (v7/*: any*/)
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
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "edges",
            "handleArgs": [
              {
                "items": [
                  {
                    "kind": "Variable",
                    "name": "connections.0",
                    "variableName": "connection"
                  }
                ],
                "kind": "ListValue",
                "name": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5b4e906032f953344afe040f29893b1e",
    "id": null,
    "metadata": {},
    "name": "ConnectionListSubscriptionQuery",
    "operationKind": "subscription",
    "text": "subscription ConnectionListSubscriptionQuery(\n  $nodeId: ID!\n  $type: String!\n  $before: String\n) {\n  node_connection(id: $nodeId, type: $type, before: $before) {\n    edges {\n      __typename\n      ...ConnectionListItem_edge\n      headId\n    }\n  }\n}\n\nfragment ConnectionListItem_edge on Edge {\n  __isEdge: __typename\n  headId\n  tail {\n    __typename\n    meta {\n      slug\n    }\n    id\n  }\n  node {\n    __typename\n    ...NodeAvatar_node\n    id\n    meta {\n      slug\n    }\n    data\n  }\n}\n\nfragment NodeAvatar_node on Node {\n  __isNode: __typename\n  __typename\n  id\n  meta {\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "f59a573617083c0b8d83614372cc6ac9";

export default node;
