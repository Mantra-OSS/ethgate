/**
 * @generated SignedSource<<789d7d09cdd001bd1aa466cff6421425>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
import { FragmentRefs } from "relay-runtime";
export type ConnectionPageOverview_node$data = {
  readonly id: GlobalId;
  readonly meta: {
    readonly slug: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ConnectionList_node">;
  readonly " $fragmentType": "ConnectionPageOverview_node";
};
export type ConnectionPageOverview_node$key = {
  readonly " $data"?: ConnectionPageOverview_node$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectionPageOverview_node">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConnectionPageOverview_node",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConnectionList_node"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};

(node as any).hash = "c6a6af38519a82b4727a56b1cfb1ef5a";

export default node;
