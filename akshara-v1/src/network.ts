import type { Libp2p } from 'libp2p';
import { unixfs } from '@helia/unixfs';
import { CID } from 'multiformats';

import { DefaultLibp2pServices } from 'helia';
import { Identify } from '@libp2p/identify';
import { PingService } from '@libp2p/ping';
import { PubSub } from '@libp2p/interface';
import { GossipSub } from '@chainsafe/libp2p-gossipsub';
import { NodeSigner, NodeSigningInterface } from './signing.js';
import type { Client, Interface, NetworkInterface, Signer, SigningInterface } from './spec.js';
import { tcp } from '@libp2p/tcp';
import { createHelia } from 'helia';
import {
  type ComponentLogger,
  type Logger,
  type Connection,
  type CounterGroup,
  type Metrics,
  type CreateListenerOptions,
  type DialOptions,
  type Transport,
  type Listener,
  transportSymbol,
  type PeerDiscovery,
} from '@libp2p/interface';
import { createLibp2p } from 'libp2p';
import { peerIdFromKeys } from '@libp2p/peer-id';
import { createSecp256k1PeerId } from '@libp2p/peer-id-factory';
import { Multiaddr, multiaddr } from '@multiformats/multiaddr';
import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { identify } from '@libp2p/identify';
import { ping } from '@libp2p/ping';
import { mplex } from '@libp2p/mplex';
import { bootstrap } from '@libp2p/bootstrap';
import { gossipsub } from '@chainsafe/libp2p-gossipsub';
import { PubSubPeerDiscovery, TOPIC, pubsubPeerDiscovery } from '@libp2p/pubsub-peer-discovery';

export interface Libp2pServices extends Record<string, unknown> {
  // autoNAT: unknown
  // dcutr: unknown
  // delegatedRouting: unknown
  // dht: KadDHT
  identify: Identify;
  // keychain: Keychain
  ping: PingService;
  pubsub: PubSub;
  // relay: CircuitRelayService
  // upnp: unknown
}

export class NodeNetworkInterface implements NetworkInterface {
  static async create() {
    const helia = await createHelia();

    // const fs = unixfs(helia);

    // const cid = CID.parse('bafybeigmfwlweiecbubdw4lq6uqngsioqepntcfohvrccr2o5f7flgydme');

    // const decoder = new TextDecoder();
    // let text = '';

    // // read the file from the blockstore using the second Helia node
    // for await (const chunk of fs.cat(cid)) {
    //   text += decoder.decode(chunk, {
    //     stream: true,
    //   });
    // }

    // console.log('asd', text);

    const libp2p = helia.libp2p;

    // const libp2p = await createLibp2p({
    //   connectionManager: {},
    //   addresses: {
    //     listen: ['/ip4/0.0.0.0/tcp/0'],
    //   },
    //   transports: [tcp()],
    //   connectionEncryption: [noise()],
    //   streamMuxers: [yamux(), mplex()],
    //   peerDiscovery: [
    //     // bootstrap({
    //     //   list: [
    //     //     '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
    //     //     '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
    //     //     '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
    //     //     '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
    //     //     '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
    //     //   ],
    //     // }),
    //     // pubsubPeerDiscovery({
    //     //   // topics: [TOPIC, 'fruit'],
    //     // }),
    //   ],
    //   services: {
    //     identify: identify({
    //       maxOutboundStreams: 100,
    //       maxInboundStreams: 100,
    //     }),
    //     ping: ping(),
    //     pubsub: gossipsub({
    //       // allowPublishToZeroPeers: true,
    //     }),
    //   },
    // });

    // // await libp2p.start();
    // await libp2p.afterStart;

    // libp2p.services.pubsub.addEventListener('message', (message) => {
    //   console.log(`${message.detail.topic}:`, new TextDecoder().decode(message.detail.data));
    // });

    // libp2p.services.pubsub.subscribe('fruit');

    // await libp2p.services.pubsub.publish('fruit', new TextEncoder().encode('banana'));

    // const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    // await sleep(1000);

    // const libp2p = await createLibp2p({
    //   addresses: {
    //     listen: ['/']
    //   },
    //   transports: [tcp()],
    //   // peerId,
    //   start: false,
    // });
    return new NodeNetworkInterface(libp2p);
  }
  constructor(public readonly libp2p: Libp2p<Libp2pServices>) {}
}
