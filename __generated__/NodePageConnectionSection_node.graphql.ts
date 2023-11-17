/**
 * @generated SignedSource<<abfb6d794fc7e983b1e05dab84923ca8>>
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
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "edgeTypeName"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "NodePageConnectionSection_node",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "edgeTypeName",
          "variableName": "edgeTypeName"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        }
      ],
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

(node as any).hash = "672694dba6bfba389bfd73c98416e20c";

export default node;
