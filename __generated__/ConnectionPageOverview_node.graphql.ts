/**
 * @generated SignedSource<<8e582e4186f2180f3a9b300a95ce8c25>>
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
  "name": "ConnectionPageOverview_node",
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

(node as any).hash = "f7160fda3bff0f947a63dbea6f5e9665";

export default node;
