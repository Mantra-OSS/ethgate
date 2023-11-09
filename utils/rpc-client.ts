import type { Result } from './result';

export type RpcClientMethod<
  TName extends string = any,
  TParams extends unknown[] = any,
  TValue = any,
> = {
  Name: TName;
  Params: TParams;
  Value: TValue;
  Call: [TName, TParams];
  Result: Result<TValue, Error>;
};

export abstract class RpcClient<TMethod extends RpcClientMethod> {
  abstract executeBatch(calls: TMethod['Call'][]): Promise<TMethod['Result'][]>;

  async executeMany<
    TCalls extends TMethod['Call'][],
    TResults extends TMethod['Result'][] = {
      [P in keyof TCalls]: Extract<TMethod, { Name: TCalls[P][0] }>['Result'];
    },
  >(calls: TCalls): Promise<TResults> {
    return this.executeBatch(calls as any) as any;
  }

  async execute<
    TMethodName extends TMethod['Name'],
    TCall extends TMethod['Call'] = Extract<TMethod, { Name: TMethodName }>['Call'],
    TValue extends TMethod['Value'] = Extract<TMethod, { Name: TMethodName }>['Value'],
  >(method: TMethodName, params: TCall[1]): Promise<TValue> {
    const [result] = await this.executeBatch([[method, params]]);
    if (result.isErr) {
      throw new Error(result.error.message);
    }
    return result.value;
  }
}
