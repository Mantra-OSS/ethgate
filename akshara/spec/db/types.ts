import type { FromSchema } from 'json-schema-to-ts';

export type AksharaScalarSchema =
  | typeof hexSchema
  | typeof hashSchema
  | typeof addressSchema
  | typeof chainIdSchema
  | typeof u64Schema;

export const hexSchema = {
  title: 'Hex',
  type: 'string',
  pattern: '^0x[0-9a-fA-F]*$',
} as const;
export type Hex = FromSchema<typeof hexSchema>;
export const zeroHex: Hex = '0x';

export const hashSchema = {
  title: 'Hash',
  type: 'string',
  pattern: '^0x[0-9a-fA-F]{64}$',
} as const;
export type Hash = FromSchema<typeof hashSchema>;
export const zeroHash: Hash = '0x0000000000000000000000000000000000000000000000000000000000000000';

export const addressSchema = {
  title: 'Address',
  type: 'string',
  pattern: '^0x[0-9a-fA-F]{40}$',
} as const;
export type Address = FromSchema<typeof addressSchema>;
export const zeroAddress: Address = '0x0000000000000000000000000000000000000000';

export const chainIdSchema = {
  title: 'ChainId',
  type: 'string',
  pattern: '^[0-9]+$',
} as const;
export type AksharaChainId = FromSchema<typeof chainIdSchema>;

export const u64Schema = {
  title: 'U64',
  type: 'number',
} as const;
export type U64 = FromSchema<typeof u64Schema>;
export const zeroU64: U64 = 0;

export const timeSchema = {
  title: 'U64',
  type: 'number',
} as const;
export type Time = FromSchema<typeof timeSchema>;
export const minTime: Time = 0;
export const maxTime: Time = 2 ** 32 - 1;
