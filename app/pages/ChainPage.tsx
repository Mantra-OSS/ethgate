import { formatChainId } from "@ethgate/lib-node";
import type { Chain } from "@ethgate/lib-solver";
import { useLoaderData } from "react-router-dom";

import { useNode } from "@/app/helpers/hooks";
import ChainView from "../components/ChainView";

export default function ChainPage() {
  const variables: any = useLoaderData();
  const node = useNode<Chain>(`Chain:${formatChainId(variables)}`);

  return <ChainView nodeId={node} />;
}
