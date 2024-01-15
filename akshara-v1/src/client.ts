import { NodeNetworkInterface } from './network.js';
import type { Client, Signer, SigningInterface } from './spec.js';

export class NodeClientFactory {
  constructor(
    public readonly signingInterface: SigningInterface,
    public readonly signer: Signer,
  ) {}
  async create(): Promise<NodeClient> {
    // const signingInterface = new NodeSigningInterface();
    // const signer = await signingInterface.createSigner();
    const signer = this.signer;
    // const peerId = await peerIdFromKeys(signer.publicKey.export({

    //   // type: 'pkcs1',
    //   format: 'jwk',

    // }));

    const networkInterface = await NodeNetworkInterface.create();

    return new NodeClient(signer, networkInterface);
  }
}

export class NodeClient implements Client {
  constructor(
    public readonly signer: Signer,
    public readonly networkInterface: NodeNetworkInterface,
  ) {}
  getAddresses() {
    return this.networkInterface.libp2p.getMultiaddrs();
  }
  getPeers() {
    return [];
  }
}
