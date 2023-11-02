import type { AksharaObjectSchema } from './object.js';
import type { AksharaScalarSchema } from './types.js';

export * from './database.js';
export * from './types.js';
export * from './object.js';

export type EthgateSchema = AksharaScalarSchema | AksharaObjectSchema;
