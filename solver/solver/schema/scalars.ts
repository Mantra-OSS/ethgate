import type { ASTNode, GraphQLScalarTypeConfig, ObjectValueNode, Source, ValueNode } from 'graphql';
import { GraphQLError, GraphQLScalarType, Kind, versionInfo } from 'graphql';

export const GraphQLJSONObjectConfig = {
  name: 'JSONObject',
  serialize: ensureObject,
  parseValue: ensureObject,
  parseLiteral: parseObject,
  extensions: {
    codegenScalarType: 'Record<string, any>',
    jsonSchema: {
      type: 'object',
      additionalProperties: true,
    },
  },
} as GraphQLScalarTypeConfig<object, object>;

export const GraphQLJSONObject = new GraphQLScalarType(GraphQLJSONObjectConfig);

export function identity<T>(value: T): T {
  return value;
}

export function ensureObject(value: any, ast?: ValueNode): object {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw createGraphQLError(
      `JSONObject cannot represent non-object value: ${value}`,
      ast
        ? {
            nodes: ast,
          }
        : undefined,
    );
  }

  return value;
}

export function parseObject(ast: ObjectValueNode, variables: any): any {
  const value = Object.create(null);
  ast.fields.forEach((field) => {
    value[field.name.value] = parseLiteral(field.value, variables);
  });

  return value;
}

export function parseLiteral(ast: ValueNode, variables: any): any {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT:
      return parseObject(ast, variables);
    case Kind.LIST:
      return ast.values.map((n) => parseLiteral(n, variables));
    case Kind.NULL:
      return null;
    case Kind.VARIABLE: {
      const name = ast.name.value;
      return variables ? variables[name] : undefined;
    }
  }
}

interface GraphQLErrorOptions {
  nodes?: ReadonlyArray<ASTNode> | ASTNode | null;
  source?: Source;
  positions?: ReadonlyArray<number>;
  path?: ReadonlyArray<string | number>;
  originalError?: Error & {
    readonly extensions?: unknown;
  };
  extensions?: any;
}

export function createGraphQLError(message: string, options?: GraphQLErrorOptions): GraphQLError {
  if (versionInfo.major >= 17) {
    return new GraphQLError(message, options);
  }
  return new GraphQLError(
    message,
    options?.nodes,
    options?.source,
    options?.positions,
    options?.path,
    options?.originalError,
    options?.extensions,
  );
}
