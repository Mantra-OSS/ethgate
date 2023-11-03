import { formatBlockId } from "@ethgate/lib-node";
import type { Block } from "@ethgate/lib-solver";
import { useLoaderData } from "react-router-dom";

import { useNode } from "@/app/helpers/hooks";
import BlockView from "../components/BlockView";

export default function BlockPage() {
  const variables: any = useLoaderData();
  const node = useNode<Block>(`Block:${formatBlockId(variables)}`);

  return <BlockView node={node} />;
}
