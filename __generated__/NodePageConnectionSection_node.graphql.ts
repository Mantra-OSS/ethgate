/**
 * @generated SignedSource<<8ff73f6d7572b7af7ecc4c44a397e1a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
import { FragmentRefs } from "relay-runtime";
export type NodePageConnectionSection_node$data = {
  readonly id: GlobalId;
  readonly meta: {
    readonly slug: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ConnectionList_node">;
  readonly " $fragmentType": "NodePageConnectionSection_node";
};
export type NodePageConnectionSection_node$key = {
  readonly " $data"?: NodePageConnectionSection_node$data;
  readonly " $fragmentSpreads": FragmentRefs<"NodePageConnectionSection_node">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NodePageConnectionSection_node",
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

(node as any).hash = "352bcedf878cdf1755ddb9d117d267c7";

export default node;
