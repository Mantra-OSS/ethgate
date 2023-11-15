/**
 * @generated SignedSource<<53d4d33b87229f4b9d5c9b32c97c1b07>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
export type HomeViewChainSubscriptionQuery$variables = {
  before?: string | null | undefined;
  chainId: GlobalId;
  connection: GlobalId;
  type: string;
};
export type HomeViewChainSubscriptionQuery$data = {
  readonly node_connection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly data?: any;
        readonly id?: GlobalId;
      };
    }>;
  } | null | undefined;
};
export type HomeViewChainSubscriptionQuery = {
  response: HomeViewChainSubscriptionQuery$data;
  variables: HomeViewChainSubscriptionQuery$variables;
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
  "name": "chainId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connection"
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
    "variableName": "chainId"
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
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "data",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
    "name": "HomeViewChainSubscriptionQuery",
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
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ],
                    "type": "Block",
                    "abstractKey": null
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
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "HomeViewChainSubscriptionQuery",
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
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v5/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v6/*: any*/)
                    ],
                    "type": "Block",
                    "abstractKey": null
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
    "cacheID": "c999e6da5aecde1fe404ed31fda4bd64",
    "id": null,
    "metadata": {},
    "name": "HomeViewChainSubscriptionQuery",
    "operationKind": "subscription",
    "text": "subscription HomeViewChainSubscriptionQuery(\n  $chainId: ID!\n  $type: String!\n  $before: String\n) {\n  node_connection(id: $chainId, type: $type, before: $before) {\n    edges {\n      __typename\n      node {\n        __typename\n        ... on Block {\n          id\n          data\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "df35eaf04c035fa998adb95fe0fc1956";

export default node;
