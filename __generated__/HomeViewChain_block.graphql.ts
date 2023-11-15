/**
 * @generated SignedSource<<668d98cd767d6918fb6d7bac65852654>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
import { FragmentRefs } from "relay-runtime";
export type HomeViewChain_block$data = {
  readonly data: any;
  readonly id: GlobalId;
  readonly " $fragmentType": "HomeViewChain_block";
};
export type HomeViewChain_block$key = {
  readonly " $data"?: HomeViewChain_block$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeViewChain_block">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeViewChain_block",
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
      "kind": "ScalarField",
      "name": "data",
      "storageKey": null
    }
  ],
  "type": "Block",
  "abstractKey": null
};

(node as any).hash = "859848b600d9d33a18e9d1ae677e9cc7";

export default node;
