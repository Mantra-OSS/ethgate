import { formatChainId } from "@ethgate/lib-node";
import type { Chain } from "@ethgate/lib-solver";
import { useLoaderData } from "react-router-dom";

import { useNode } from "../helpers/backend.js";
import ChainBlocksView from "../components/ChainBlocksView.js";

export default function ChainBlocksPage() {
  const variables: any = useLoaderData();
  const node = useNode<Chain>(`Chain:${formatChainId(variables)}`);

  return <ChainBlocksView node={node} />;
}
