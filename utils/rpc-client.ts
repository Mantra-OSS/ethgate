import type { Result } from "./result";

export type RpcClientMethod<
  Name extends string = any,
  Params extends unknown[] = any,
  Value = any
> = {
  Name: Name;
  Params: Params;
  Value: Value;
  Call: [Name, Params];
  Result: Result<Value, Error>;
};

export abstract class RpcClient<Method extends RpcClientMethod> {
  abstract executeBatch(calls: Method["Call"][]): Promise<Method["Result"][]>;

  async executeMany<
    Calls extends Method["Call"][],
    Results extends Method["Result"][] = {
      [P in keyof Calls]: Extract<Method, { Name: Calls[P][0] }>["Result"];
    }
  >(calls: Calls): Promise<Results> {
    return this.executeBatch(calls as any) as any;
  }

  async execute<
    MethodName extends Method["Name"],
    Call extends Method["Call"] = Extract<Method, { Name: MethodName }>["Call"],
    Value extends Method["Value"] = Extract<
      Method,
      { Name: MethodName }
    >["Value"]
  >(method: MethodName, params: Call[1]): Promise<Value> {
    const [result] = await this.executeBatch([[method, params]]);
    if (result.isErr) {
      throw new Error(result.error.message);
    }
    return result.value;
  }
}
