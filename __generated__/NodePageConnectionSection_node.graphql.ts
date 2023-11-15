/**
 * @generated SignedSource<<b2cbbc1ab2f470619e5398b9092554d9>>
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

(node as any).hash = "17a9068667b9c04774ccf8cdffa7f1f2";

export default node;
