/**
 * @generated SignedSource<<2eedd2d607a12df7e16edb8a5605660d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
import { FragmentRefs } from "relay-runtime";
export type NodeAvatar_node$data = {
  readonly __typename: string;
  readonly id: GlobalId;
  readonly meta: {
    readonly name: string;
  };
  readonly " $fragmentType": "NodeAvatar_node";
};
export type NodeAvatar_node$key = {
  readonly " $data"?: NodeAvatar_node$data;
  readonly " $fragmentSpreads": FragmentRefs<"NodeAvatar_node">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NodeAvatar_node",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
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
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};

(node as any).hash = "70874dc457c285f6d3f55540d42899bd";

export default node;
