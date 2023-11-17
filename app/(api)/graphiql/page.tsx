'use client';
import { useSolver } from '@/app/client/backend';
import relayEnvironment from '@/app/client/relay';
import { Box } from '@mui/material';
import type { GraphiQLProps } from 'graphiql';
import { GraphiQLInterface, GraphiQLProvider } from 'graphiql';
import { parse, print } from 'graphql';

import 'graphiql/graphiql.css';

const formatGql = (query: string) => {
  return print(parse(query));
};

const formatJson = (json: string) => {
  return JSON.stringify(JSON.parse(json), null, 2);
};

const fetcher: GraphiQLProps['fetcher'] = (params) => {
  return relayEnvironment.getNetwork().execute(
    {
      operationKind: 'query',
      text: params.query,
    } as any,
    params.variables,
    {},
  );
};

const defaultTabs = [
  {
    query: `# Welcome to ethgate.io's GraphiQL!

# This page is for developers to
# test their queries and mutations.

${formatGql(`
query ExampleQuery($id: String!) {
  root {
    chain(id: $id) {
      name
      descendantBlocks(first:1) {
        edges {
          node {
            id
            number
          }
        }
      }
    }
  }
}
`)}`,
    variables: formatJson(`{ "id": "1" }`),
  },
];

// const editorContext = useEditorContext({ nonNull: true });

export default function Page() {
  const solver = useSolver();

  return (
    <Box
      style={{
        height: '90vh',
      }}
    >
      <GraphiQLProvider
        fetcher={fetcher}
        schema={solver.schema}
        defaultTabs={defaultTabs}
        dangerouslyAssumeSchemaIsValid
      >
        <GraphiQLInterface isHeadersEditorEnabled={false} />
      </GraphiQLProvider>
    </Box>
  );
}
