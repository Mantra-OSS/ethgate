import { describe, expect, it } from '@jest/globals';

import { GraphQLAddress, GraphQLHash, GraphQLHex } from './primitive.js';

describe('GraphQLAddress', () => {
  it('should throw an error if the value is not a valid address', () => {
    expect(() => GraphQLAddress.serialize('0x123')).toThrowError('Invalid address: 0x123');
  });

  it('should return the value if it is a valid address', () => {
    expect(GraphQLAddress.serialize('0x1234567890123456789012345678901234567890')).toBe(
      '0x1234567890123456789012345678901234567890',
    );
  });
});

describe('GraphQLHash', () => {
  it('should throw an error if the value is not a valid hash', () => {
    expect(() => GraphQLHash.serialize('0x123')).toThrowError('Invalid hash: 0x123');
  });

  it('should return the value if it is a valid hash', () => {
    expect(
      GraphQLHash.serialize('0x1234567890123456789012345678901234567890123456789012345678901234'),
    ).toBe('0x1234567890123456789012345678901234567890123456789012345678901234');
  });
});

describe('GraphQLHex', () => {
  it('should throw an error if the value is not a valid hex', () => {
    expect(() => GraphQLHex.serialize('0x123g')).toThrowError('Invalid hex: 0x123g');
  });

  it('should return the value if it is a valid hex', () => {
    expect(
      GraphQLHex.serialize('0x1234567890123456789012345678901234567890123456789012345678901234'),
    ).toBe('0x1234567890123456789012345678901234567890123456789012345678901234');
  });
});
