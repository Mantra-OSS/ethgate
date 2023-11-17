/**
 * @generated SignedSource<<c9ca2f275e9b329860a1a81574ca3743>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
import { FragmentRefs } from "relay-runtime";
export type ConnectionListItem_edge$data = {
  readonly headId: GlobalId;
  readonly node: {
    readonly data: any;
    readonly id: GlobalId;
    readonly meta: {
      readonly slug: string;
    };
    readonly " $fragmentSpreads": FragmentRefs<"NodeAvatar_node">;
  };
  readonly tail: {
    readonly meta: {
      readonly slug: string;
    };
  };
  readonly " $fragmentType": "ConnectionListItem_edge";
};
export type ConnectionListItem_edge$key = {
  readonly " $data"?: ConnectionListItem_edge$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectionListItem_edge">;
};

const node: ReaderFragment = (function(){
var v0 = {
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConnectionListItem_edge",
  "selections": [
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
        (v0/*: any*/)
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
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "NodeAvatar_node"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
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
  "type": "Edge",
  "abstractKey": "__isEdge"
};
})();

(node as any).hash = "2da989df41917e497ff85b04144c923d";

export default node;
