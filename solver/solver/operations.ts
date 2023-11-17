import type { ConnectionData } from '@/app/client/backend';
import type { DocumentNode, FragmentDefinitionNode, OperationDefinitionNode } from 'graphql';
import { GraphQLInterfaceType, OperationTypeNode } from 'graphql';
import {
  ASTNode,
  GraphQLBoolean,
  GraphQLError,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  GraphQLSchema,
  GraphQLString,
  Kind,
  ObjectValueNode,
  Source,
  ValueNode,
  printSchema,
} from 'graphql';

import type { Chain, NodeType, SolverEdge, SolverNode } from '../graph';

import { GraphQLJSONObject } from './schema/scalars';
import type { Solver, SolverGraph } from './solver';

export type SolverOperations = DocumentNode;
export const createSolverOperations = (graph: SolverGraph): SolverOperations => {
  const nodeMetaFragment = {
    kind: Kind.FRAGMENT_DEFINITION,
    name: {
      kind: Kind.NAME,
      value: 'NodeFragment',
    },
    typeCondition: {
      kind: Kind.NAMED_TYPE,
      name: {
        kind: Kind.NAME,
        value: 'Node',
      },
    },
    selectionSet: {
      kind: Kind.SELECTION_SET,
      selections: [
        {
          kind: Kind.FIELD,
          name: {
            kind: Kind.NAME,
            value: 'id',
          },
        },
        {
          kind: Kind.FIELD,
          name: {
            kind: Kind.NAME,
            value: 'meta',
          },
          selectionSet: {
            kind: Kind.SELECTION_SET,
            selections: [
              {
                kind: Kind.FIELD,
                name: {
                  kind: Kind.NAME,
                  value: 'name',
                },
              },
              {
                kind: Kind.FIELD,
                name: {
                  kind: Kind.NAME,
                  value: 'slug',
                },
              },
            ],
          },
        },
        {
          kind: Kind.FIELD,
          name: {
            kind: Kind.NAME,
            value: 'data',
          },
        },
      ],
    },
  } satisfies FragmentDefinitionNode;
  // const nodeFragment = {
  //   kind: Kind.FRAGMENT_DEFINITION,
  //   name: {
  //     kind: Kind.NAME,
  //     value: 'NodeFragment',
  //   },
  //   typeCondition: {
  //     kind: Kind.NAMED_TYPE,
  //     name: {
  //       kind: Kind.NAME,
  //       value: 'Node',
  //     },
  //   },
  //   selectionSet: {
  //     kind: Kind.SELECTION_SET,
  //     selections: [
  //       {
  //         kind: Kind.FIELD,
  //         name: {
  //           kind: Kind.NAME,
  //           value: 'meta',
  //         },
  //         selectionSet: {
  //           kind: Kind.SELECTION_SET,
  //           selections: [
  //             {
  //               kind: Kind.FIELD,
  //               name: {
  //                 kind: Kind.NAME,
  //                 value: 'name',
  //               },
  //             },
  //             {
  //               kind: Kind.FIELD,
  //               name: {
  //                 kind: Kind.NAME,
  //                 value: 'slug',
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     ],
  //   },
  // } satisfies FragmentDefinitionNode;
  const nodeQuery = {
    kind: Kind.OPERATION_DEFINITION,
    operation: OperationTypeNode.QUERY,
    name: {
      kind: Kind.NAME,
      value: `NodeQuery`,
    },
    variableDefinitions: [
      {
        kind: Kind.VARIABLE_DEFINITION,
        type: {
          kind: Kind.NON_NULL_TYPE,
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: 'ID',
            },
          },
        },
        variable: {
          kind: Kind.VARIABLE,
          name: {
            kind: Kind.NAME,
            value: 'nodeId',
          },
        },
      },
    ],
    selectionSet: {
      kind: Kind.SELECTION_SET,
      selections: [
        {
          kind: Kind.FIELD,
          name: {
            kind: Kind.NAME,
            value: 'node',
          },
          arguments: [
            {
              kind: Kind.ARGUMENT,
              name: {
                kind: Kind.NAME,
                value: 'id',
              },
              value: {
                kind: Kind.VARIABLE,
                name: {
                  kind: Kind.NAME,
                  value: 'nodeId',
                },
              },
            },
          ],
          selectionSet: {
            kind: Kind.SELECTION_SET,
            selections: [
              {
                kind: Kind.FRAGMENT_SPREAD,
                name: {
                  kind: Kind.NAME,
                  value: 'NodeFragment',
                },
                directives: [
                  {
                    kind: Kind.DIRECTIVE,
                    name: {
                      kind: Kind.NAME,
                      value: 'inline',
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  } satisfies OperationDefinitionNode;

  const document = {
    kind: Kind.DOCUMENT,
    definitions: [nodeMetaFragment, nodeQuery],
  } satisfies DocumentNode;

  // for (const nodeType of graph.nodeTypes) {
  //   const operationDefinition = {
  //     kind: Kind.OPERATION_DEFINITION,
  //     operation: OperationTypeNode.QUERY,
  //     name: {
  //       kind: Kind.NAME,
  //       value: `${nodeType.name}Query`,
  //     },
  //     selectionSet: {
  //       kind: Kind.SELECTION_SET,
  //       selections: [
  //         {kind: Kind.FIELD,
  //           name: {
  //             kind: Kind.NAME,
  //             value: 'node',
  //           }
  //         }
  //       ],
  //     },
  //   } satisfies OperationDefinitionNode;

  //   operationDefinition.

  //   document.definitions.push(asd);
  // }

  return document;
};
