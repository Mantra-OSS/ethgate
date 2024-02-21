import { encodeFunctionData } from 'viem';

export function createMulticallData(
  abi: any,
  functionName: string,
  node: string,
  keys: string[],
  values: string[],
) {
  const results = keys.map((key, index) => {
    return encodeFunctionData({
      abi: abi,
      functionName: functionName,
      args: [node, key, values[index]],
    });
  });

  return results;
}
