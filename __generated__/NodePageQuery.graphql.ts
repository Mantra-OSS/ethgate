/**
 * @generated SignedSource<<679be1d91be9daa4303a4f9547308c36>>
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
  id: GlobalId;
};
export type NodePageQuery$data = {
  readonly node: {
    readonly data: any;
    readonly id: GlobalId;
    readonly meta: {
      readonly name: string;
    };
    readonly " $fragmentSpreads": FragmentRefs<"NodePageConnectionSection_node">;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "data",
  "storageKey": null
};
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
            "name": "NodePageConnectionSection_node"
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "NodeMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isNode"
          },
          (v2/*: any*/),
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
                "name": "slug",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "30ce04aa3722988708d5f28182068e93",
    "id": null,
    "metadata": {},
    "name": "NodePageQuery",
    "operationKind": "query",
    "text": "query NodePageQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...NodePageConnectionSection_node\n    id\n    meta {\n      name\n    }\n    data\n  }\n}\n\nfragment NodePageConnectionSection_node on Node {\n  __isNode: __typename\n  id\n  meta {\n    slug\n  }\n}\n"
  }
};
})();

(node as any).hash = "7abefce6b25a9d9441087c3401ec5f49";

export default node;
