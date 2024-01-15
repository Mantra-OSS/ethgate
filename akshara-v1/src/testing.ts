// export class TestContext {
//   constructor(public entities: TestEntity[]) {}
// }

import { NodeClient, NodeClientFactory } from './client.js';
import { NodeSigningInterface } from './signing.js';

// export class TestContextBuilder {
//   constructor(public entities: TestEntity[] = []) {}
//   actor(...args: ConstructorParameters<typeof TestActor>): TestContextBuilder {
//     this.entities.push(new TestActor(...args));
//     return this;
//   }
//   finish(): TestContext {
//     return new TestContext(this.entities);
//   }
// }

export abstract class TestEntity {
  constructor() {}
}

export class TestActor extends TestEntity {
  static async create(name: string): Promise<TestActor> {
    const signingInterface = new NodeSigningInterface();
    const signer = await signingInterface.createSigner();
    const factory = new NodeClientFactory(signingInterface, signer);
    const client = await factory.create();

    return new TestActor(name, client);
  }
  constructor(
    public readonly name: string,
    public readonly client: NodeClient,
  ) {
    super();
  }
  async stop(): Promise<void> {
    await this.client.networkInterface.libp2p.stop();
  }
}

// export class TestActorBuilder {
//   constructor(public readonly name: string) {}
//   finish(): TestActor {
//     return new TestActor(this.name);
//   }
// }

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
