/**
 * @generated SignedSource<<67d29b704b688660c089971181503a84>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { GlobalId } from "@/lib-solver";
import { FragmentRefs } from "relay-runtime";
export type HomeViewChain_node$data = {
  readonly connection: {
    readonly __id: GlobalId;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly data?: any;
        readonly id?: GlobalId;
      };
    }>;
    readonly pageInfo: {
      readonly startCursor: string | null | undefined;
    };
  };
  readonly id: GlobalId;
  readonly meta: {
    readonly name: string;
    readonly slug: string;
  };
  readonly " $fragmentType": "HomeViewChain_node";
};
export type HomeViewChain_node$key = {
  readonly " $data"?: HomeViewChain_node$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeViewChain_node">;
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
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "connection"
        ]
      }
    ]
  },
  "name": "HomeViewChain_node",
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
      "alias": "connection",
      "args": [
        {
          "kind": "Literal",
          "name": "type",
          "value": "ChainHasBlock"
        }
      ],
      "concreteType": null,
      "kind": "LinkedField",
      "name": "__HomeViewChainQuery_connection_connection",
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
                {
                  "kind": "InlineFragment",
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
                  "type": "Block",
                  "abstractKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "startCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "kind": "ClientExtension",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__id",
              "storageKey": null
            }
          ]
        }
      ],
      "storageKey": "__HomeViewChainQuery_connection_connection(type:\"ChainHasBlock\")"
    }
  ],
  "type": "Chain",
  "abstractKey": null
};
})();

(node as any).hash = "a03daff5b22348604caf499e272ac6af";

export default node;
