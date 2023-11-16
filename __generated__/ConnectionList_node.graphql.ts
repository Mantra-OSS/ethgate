/**
 * @generated SignedSource<<4c3c2d472dac7b6eeb6b042c4351e017>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
import { FragmentRefs } from "relay-runtime";
export type ConnectionList_node$data = {
  readonly id: GlobalId;
  readonly meta: {
    readonly slug: string;
  };
  readonly " $fragmentType": "ConnectionList_node";
};
export type ConnectionList_node$key = {
  readonly " $data"?: ConnectionList_node$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectionList_node">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConnectionList_node",
  "selections": [
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

(node as any).hash = "402635d4cfa6b84d24c7485ceb752c79";

export default node;
