import type { NodeAvatar_node$key } from '@/__generated__/NodeAvatar_node.graphql';
import type { Chain } from '@/lib-solver';
import { Avatar } from '@mui/material';
import { Suspense } from 'react';
import { useFragment } from 'react-relay';
import { graphql } from 'relay-runtime';

import { useNode2, useSolver } from '../client/backend';

import { NodeTypeIcon } from './ui';

export const nodeAvatarFragment = graphql`
  fragment NodeAvatar_node on Node {
    __typename
    id
    meta {
      name
    }
  }
`;

export function NodeAvatar({ node: nodeFragment }: { node: NodeAvatar_node$key }) {
  const node2 = useFragment(nodeAvatarFragment, nodeFragment);
  const solver = useSolver();
  const nodeType = solver.graph.getNodeTypeById(node2.id);
  const node = useNode2(node2.id);
  let imageSrc;
  let body;
  if (node) {
    imageSrc = node.meta.imageUrl;

    if (!imageSrc) {
      // TODO: Add API routes for node images
      switch (node.type) {
        case 'Chain': {
          imageSrc = `/statics/${(node as Chain).data.chainId}.svg`;
          break;
        }
        case 'Block':
        case 'Transaction':
        case 'Receipt':
        case 'Log': {
          body = <NodeTypeIcon nodeType={node.type} color="primary" sx={{ fontSize: 22 }} />;
          break;
        }
      }
    }
  }
  return (
    <Suspense
      fallback={
        <Avatar sx={{ width: 32, height: 32 }}>
          <NodeTypeIcon nodeType={nodeType.name} color="primary" sx={{ fontSize: 22 }} />
        </Avatar>
      }
    >
      {node ? (
        <Avatar sx={{ width: 32, height: 32 }} alt={node.meta.name} src={imageSrc}>
          {body ??
            node.meta.name
              .split(' ')
              .map((word) => word[0])
              .join('')}
        </Avatar>
      ) : (
        <Avatar sx={{ width: 32, height: 32 }}>
          <NodeTypeIcon nodeType={nodeType.name} color="primary" sx={{ fontSize: 22 }} />
        </Avatar>
      )}
    </Suspense>
  );
}
