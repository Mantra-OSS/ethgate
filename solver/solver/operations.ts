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
  const nodeFragment = {
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
  const nodeConnectionFragment = {
    kind: Kind.FRAGMENT_DEFINITION,
    name: {
      kind: Kind.NAME,
      value: `NodeConnectionFragment`,
    },
    typeCondition: {
      kind: Kind.NAMED_TYPE,
      name: {
        kind: Kind.NAME,
        value: 'Node',
      },
    },
    directives: [
      // @argumentDefinitions
      {
        kind: Kind.DIRECTIVE,
        name: {
          kind: Kind.NAME,
          value: 'argumentDefinitions',
        },
        arguments: [
          // nodeId
          {
            kind: Kind.ARGUMENT,
            name: {
              kind: Kind.NAME,
              value: 'nodeId',
            },
            value: {
              kind: Kind.OBJECT,
              fields: [
                {
                  kind: Kind.OBJECT_FIELD,
                  name: {
                    kind: Kind.NAME,
                    value: 'type',
                  },
                  value: {
                    kind: Kind.STRING,
                    value: 'ID!',
                  },
                },
              ],
            },
          },
          // edgeTypeName
          {
            kind: Kind.ARGUMENT,
            name: {
              kind: Kind.NAME,
              value: 'edgeTypeName',
            },
            value: {
              kind: Kind.OBJECT,
              fields: [
                {
                  kind: Kind.OBJECT_FIELD,
                  name: {
                    kind: Kind.NAME,
                    value: 'type',
                  },
                  value: {
                    kind: Kind.STRING,
                    value: 'String!',
                  },
                },
              ],
            },
          },
          // first
          {
            kind: Kind.ARGUMENT,
            name: {
              kind: Kind.NAME,
              value: 'first',
            },
            value: {
              kind: Kind.OBJECT,
              fields: [
                {
                  kind: Kind.OBJECT_FIELD,
                  name: {
                    kind: Kind.NAME,
                    value: 'type',
                  },
                  value: {
                    kind: Kind.STRING,
                    value: 'Int',
                  },
                },
              ],
            },
          },
          // after
          {
            kind: Kind.ARGUMENT,
            name: {
              kind: Kind.NAME,
              value: 'after',
            },
            value: {
              kind: Kind.OBJECT,
              fields: [
                {
                  kind: Kind.OBJECT_FIELD,
                  name: {
                    kind: Kind.NAME,
                    value: 'type',
                  },
                  value: {
                    kind: Kind.STRING,
                    value: 'String',
                  },
                },
              ],
            },
          },
        ],
      },
      // @refetchable
      {
        kind: Kind.DIRECTIVE,
        name: {
          kind: Kind.NAME,
          value: 'refetchable',
        },
        arguments: [
          // @argumentDefinitions
          {
            kind: Kind.ARGUMENT,
            name: {
              kind: Kind.NAME,
              value: 'queryName',
            },
            value: {
              kind: Kind.STRING,
              value: 'NodeConnectionPaginationQuery',
            },
          },
        ],
      },
    ],
    selectionSet: {
      kind: Kind.SELECTION_SET,
      selections: [
        {
          kind: Kind.FIELD,
          name: {
            kind: Kind.NAME,
            value: 'connection',
          },
          directives: [
            {
              kind: Kind.DIRECTIVE,
              name: {
                kind: Kind.NAME,
                value: 'connection',
              },
              arguments: [
                // key
                {
                  kind: Kind.ARGUMENT,
                  name: {
                    kind: Kind.NAME,
                    value: 'key',
                  },
                  value: {
                    kind: Kind.STRING,
                    value: 'ConnectionQuery_connection',
                  },
                },
              ],
            },
          ],
          arguments: [
            {
              kind: Kind.ARGUMENT,
              name: {
                kind: Kind.NAME,
                value: 'type',
              },
              value: {
                kind: Kind.VARIABLE,
                name: {
                  kind: Kind.NAME,
                  value: 'edgeTypeName',
                },
              },
            },
            {
              kind: Kind.ARGUMENT,
              name: {
                kind: Kind.NAME,
                value: 'first',
              },
              value: {
                kind: Kind.VARIABLE,
                name: {
                  kind: Kind.NAME,
                  value: 'first',
                },
              },
            },
            {
              kind: Kind.ARGUMENT,
              name: {
                kind: Kind.NAME,
                value: 'after',
              },
              value: {
                kind: Kind.VARIABLE,
                name: {
                  kind: Kind.NAME,
                  value: 'after',
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
                  value: 'edges',
                },
                selectionSet: {
                  kind: Kind.SELECTION_SET,
                  selections: [
                    {
                      kind: Kind.FIELD,
                      name: {
                        kind: Kind.NAME,
                        value: 'node',
                      },
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
              },
            ],
          },
        },
      ],
    },
  } satisfies FragmentDefinitionNode;
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
  const connectionQuery = {
    kind: Kind.OPERATION_DEFINITION,
    operation: OperationTypeNode.QUERY,
    name: {
      kind: Kind.NAME,
      value: `ConnectionQuery`,
    },
    variableDefinitions: [
      // nodeId
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
      // edgeTypeName
      {
        kind: Kind.VARIABLE_DEFINITION,
        type: {
          kind: Kind.NON_NULL_TYPE,
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: 'String',
            },
          },
        },
        variable: {
          kind: Kind.VARIABLE,
          name: {
            kind: Kind.NAME,
            value: 'edgeTypeName',
          },
        },
      },
      // first
      {
        kind: Kind.VARIABLE_DEFINITION,
        type: {
          kind: Kind.NAMED_TYPE,
          name: {
            kind: Kind.NAME,
            value: 'Int',
          },
        },
        variable: {
          kind: Kind.VARIABLE,
          name: {
            kind: Kind.NAME,
            value: 'first',
          },
        },
      },
      // after
      {
        kind: Kind.VARIABLE_DEFINITION,
        type: {
          kind: Kind.NAMED_TYPE,
          name: {
            kind: Kind.NAME,
            value: 'String',
          },
        },
        variable: {
          kind: Kind.VARIABLE,
          name: {
            kind: Kind.NAME,
            value: 'after',
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
                  value: 'NodeConnectionFragment',
                },
                directives: [
                  // @arguments
                  {
                    kind: Kind.DIRECTIVE,
                    name: {
                      kind: Kind.NAME,
                      value: 'arguments',
                    },
                    arguments: [
                      // nodeId
                      {
                        kind: Kind.ARGUMENT,
                        name: {
                          kind: Kind.NAME,
                          value: 'nodeId',
                        },
                        value: {
                          kind: Kind.VARIABLE,
                          name: {
                            kind: Kind.NAME,
                            value: 'nodeId',
                          },
                        },
                      },
                      // edgeTypeName
                      {
                        kind: Kind.ARGUMENT,
                        name: {
                          kind: Kind.NAME,
                          value: 'edgeTypeName',
                        },
                        value: {
                          kind: Kind.VARIABLE,
                          name: {
                            kind: Kind.NAME,
                            value: 'edgeTypeName',
                          },
                        },
                      },
                      // first
                      {
                        kind: Kind.ARGUMENT,
                        name: {
                          kind: Kind.NAME,
                          value: 'first',
                        },
                        value: {
                          kind: Kind.VARIABLE,
                          name: {
                            kind: Kind.NAME,
                            value: 'first',
                          },
                        },
                      },
                      // after
                      {
                        kind: Kind.ARGUMENT,
                        name: {
                          kind: Kind.NAME,
                          value: 'after',
                        },
                        value: {
                          kind: Kind.VARIABLE,
                          name: {
                            kind: Kind.NAME,
                            value: 'after',
                          },
                        },
                      },
                    ],
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
    definitions: [nodeFragment, nodeConnectionFragment, nodeQuery, connectionQuery],
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
