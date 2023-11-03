import { formatChainId } from "@ethgate/lib-node";
import type { Chain } from "@ethgate/lib-solver";
import { useLoaderData } from "react-router-dom";

import { useNode } from "../helpers/backend.js";
import ChainView from "../components/ChainView.js";

export default function ChainPage() {
  const variables: any = useLoaderData();
  const node = useNode<Chain>(`Chain:${formatChainId(variables)}`);

  return <ChainView node={node} />;
}
