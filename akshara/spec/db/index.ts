import type { AksharaObjectSchema } from "./object";
import type { AksharaScalarSchema } from "./types";

export * from "./database";
export * from "./types";
export * from "./object";

export type EthgateSchema = AksharaScalarSchema | AksharaObjectSchema;
