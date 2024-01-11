/**
 * @generated SignedSource<<5da6dc6ff7df82f2914992db9d617a16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
import { FragmentRefs } from "relay-runtime";
export type HomeViewChain_chain$data = {
  readonly connection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly data: any;
        readonly id: GlobalId;
      };
    }>;
  };
  readonly id: GlobalId;
  readonly meta: {
    readonly name: string;
    readonly slug: string;
  };
  readonly " $fragmentType": "HomeViewChain_chain";
};
export type HomeViewChain_chain$key = {
  readonly " $data"?: HomeViewChain_chain$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeViewChain_chain">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeViewChain_chain",
  "selections": [
    (v0/*: any*/),
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "type",
          "value": "ChainHasBlock"
        }
      ],
      "concreteType": null,
      "kind": "LinkedField",
      "name": "connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
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
          "storageKey": null
        }
      ],
      "storageKey": "connection(first:1,type:\"ChainHasBlock\")"
    }
  ],
  "type": "Chain",
  "abstractKey": null
};
})();

(node as any).hash = "f769c0e194743920e5c021c350f9ac1f";

export default node;
