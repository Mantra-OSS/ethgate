import type { Transaction } from "@ethgate/lib-solver";
import { useLoaderData } from "react-router-dom";

import { useNode } from "@/app/helpers/hooks";
import TransactionView from "../components/TransactionView";

export default function TransactionPage() {
  const node = useNode<Transaction>(useLoaderData() as any);

  return <TransactionView node={node} />;
}
