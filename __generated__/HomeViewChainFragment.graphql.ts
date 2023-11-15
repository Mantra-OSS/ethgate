/**
 * @generated SignedSource<<a78c035c343322ef5c765e586e6d12a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
import { FragmentRefs } from "relay-runtime";
export type HomeViewChainFragment$data = {
  readonly data: any;
  readonly id: GlobalId;
  readonly " $fragmentType": "HomeViewChainFragment";
};
export type HomeViewChainFragment$key = {
  readonly " $data"?: HomeViewChainFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeViewChainFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeViewChainFragment",
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

(node as any).hash = "f469c05513ecf9c75277b9147b0aefc3";

export default node;
