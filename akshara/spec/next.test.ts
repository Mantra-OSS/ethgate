import { gossipsub } from '@chainsafe/libp2p-gossipsub';
import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { bootstrap } from '@libp2p/bootstrap';
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2';
// import { mdns } from '@libp2p/mdns';
import { type Identify, identify } from '@libp2p/identify';
import type { Message, SignedMessage } from '@libp2p/interface-pubsub';
import { kadDHT, removePrivateAddressesMapper } from '@libp2p/kad-dht';
import { mplex } from '@libp2p/mplex';
// import { tcp } from '@libp2p/tcp';
import { peerIdFromString } from '@libp2p/peer-id';
import { type PingService, ping } from '@libp2p/ping';
import { webRTC, webRTCDirect } from '@libp2p/webrtc';
import { webSockets } from '@libp2p/websockets';
import * as filters from '@libp2p/websockets/filters';
import { webTransport } from '@libp2p/webtransport';
import type { Multiaddr } from '@multiformats/multiaddr';
import { multiaddr } from '@multiformats/multiaddr';
import { createLibp2p } from 'libp2p';
import { sha256 } from 'multiformats/hashes/sha2';

const CHAT_TOPIC = 'universal-connectivity';
const CHAT_FILE_TOPIC = 'universal-connectivity-file';
const FILE_EXCHANGE_PROTOCOL = '/universal-connectivity-file/1';

const CIRCUIT_RELAY_CODE = 290;

const WEBRTC_BOOTSTRAP_NODE =
  '/ip4/164.92.229.178/udp/9090/webrtc-direct/certhash/uEiCyG5zCRpky38iwqX6RCuNvaAumkTM0dexnyVXjMf6QLA/p2p/12D3KooWDsKuyhLWZwXXwFph1Tgd2CWs4RJFktsVKdQL94uHLsZv';
const WEBTRANSPORT_BOOTSTRAP_NODE =
  '/ip4/164.92.229.178/udp/9095/quic-v1/webtransport/certhash/uEiDZIdF6aYjPFG_hNYUdJvnsXrlrb6SYbfih3YF239Eujw/certhash/uEiD9iIyO-ZuQeit4oxL5WwppcToPHM9nFmyZOYjRf2Z6ww/p2p/12D3KooWPi5w2xUemmikdhjGH6fvXVM7ZRb59rwRQmUyesJK3wYy';

async function msgIdFnStrictNoSign(msg: Message): Promise<Uint8Array> {
  const enc = new TextEncoder();

  const signedMessage = msg as SignedMessage;
  const encodedSeqNum = enc.encode(signedMessage.sequenceNumber.toString());
  return await sha256.encode(encodedSeqNum);
}

const createClient = async () => {
  const node = await createLibp2p({
    addresses: {
      // listen: ['/ip4/0.0.0.0/tcp/0'],
      listen: ['/webrtc'],
    },
    transports: [
      webTransport(),
      // the WebSocket transport lets us dial a local relay
      webSockets({
        // this allows non-secure WebSocket connections for purposes of the demo
        filter: filters.all,
      }),
      // support dialing/listening on WebRTC addresses
      webRTC({
        rtcConfiguration: {
          iceServers: [
            {
              urls: ['stun:stun.l.google.com:19302', 'stun:global.stun.twilio.com:3478'],
            },
          ],
        },
      }),
      webRTCDirect(),
      circuitRelayTransport({
        discoverRelays: 1,
      }),
      // // support dialing/listening on Circuit Relay addresses
      // circuitRelayTransport({
      //   // make a reservation on any discovered relays - this will let other
      //   // peers use the relay to contact us
      //   discoverRelays: 1
      // })
    ],
    streamMuxers: [
      yamux(),
      // mplex()
    ],
    connectionGater: {
      denyDialMultiaddr: () => {
        // by default we refuse to dial local addresses from browsers since they
        // are usually sent by remote peers broadcasting undialable multiaddrs and
        // cause errors to appear in the console but in this example we are
        // explicitly connecting to a local node so allow all addresses
        return false;
      },
    },
    connectionManager: {
      maxConnections: 10,
      minConnections: 5,
    },
    connectionEncryption: [noise()],
    peerDiscovery: [
      bootstrap({
        list: [WEBRTC_BOOTSTRAP_NODE],
      }),
    ],
    services: {
      pubsub: gossipsub({
        allowPublishToZeroPeers: true,
        msgIdFn: msgIdFnStrictNoSign,
        ignoreDuplicatePublishError: true,
      }),
      dht: kadDHT({
        // protocolPrefix: "/universal-connectivity",
        protocol: '/universal-connectivity',
        maxInboundStreams: 5000,
        maxOutboundStreams: 5000,
        clientMode: true,
      }),
      // aminoDHT: kadDHT({
      //   protocol: '/ipfs/kad/1.0.0',
      //   // addressFilter: removePrivateAddressesMapper
      // }),
      identify: identify(),
    },
  });

  return node;
};

describe('next', () => {
  it('should work', async () => {
    const node = await createClient();

    node.services.pubsub.subscribe(CHAT_TOPIC);
    node.services.pubsub.subscribe(CHAT_FILE_TOPIC);

    node.addEventListener('peer:connect', (evt) => {
      const peerId = evt.detail;
      console.log('Connection established to:', peerId.toString()); // Emitted when a peer has been found
    });

    node.addEventListener('peer:discovery', (evt) => {
      const peerInfo = evt.detail;

      console.log('Discovered:', peerInfo.id.toString());
    });

    node.addEventListener('self:peer:update', ({ detail: { peer } }) => {
      const multiaddrs = peer.addresses.map(({ multiaddr }) => multiaddr);

      console.log(`changed multiaddrs: peer ${peer.id.toString()} multiaddrs: ${multiaddrs}`);
    });

    // const node = await createLibp2p({
    //   // peerDiscovery: [mdns()],
    //   peerDiscovery: [
    //     bootstrap({
    //       list: [
    //         // a list of bootstrap peer multiaddrs to connect to on node startup
    //         '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
    //         '/dnsaddr/bootstrap.libp2p.io/ipfs/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
    //         '/dnsaddr/bootstrap.libp2p.io/ipfs/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
    //       ],
    //       // timeout: 1000, // in ms,
    //       // tagName: 'bootstrap',
    //       // tagValue: 50,
    //       // tagTTL: 120000, // in ms
    //     }),
    //   ],
    //   services: {
    //     dht: kadDHT({}),
    //     // aminoDHT: kadDHT({
    //     //   protocol: '/ipfs/kad/1.0.0',
    //     //   peerInfoMapper: removePrivateAddressesMapper,
    //     // }),
    //     // ping: ping(),
    //     identify: identify(),
    //   },

    //   streamMuxers: [yamux(), mplex()],
    //   transports: [
    //     webRTC(),
    //     // webSockets({ filter: filters.all }),
    //     // circuitRelayTransport({
    //     //   discoverRelays: 1,
    //     // }),
    //   ],
    //   addresses: {
    //     listen: ['/webrtc'],
    //   },
    //   // transports: [tcp()],
    //   connectionEncryption: [noise()],
    //   connectionGater: {
    //     denyDialMultiaddr: async () => false,
    //   },
    // });

    // node.addEventListener('peer:discovery', (event) => {
    //   const peerId = event.detail.id;
    //   console.log(`Discovered peer ${peerId.toString()}`);
    // });

    // console.log('Starting libp2p...');
    // await node.start();
    // console.log('Started libp2p.');

    // const sortByNonLocalIp = (a: Multiaddr, b: Multiaddr): number => {
    //   if (a.toString().includes('127.0.0.1')) {
    //     return 1;
    //   }
    //   return -1;
    // };
    // const multiaddrs = node
    //   .getMultiaddrs()
    //   .sort(sortByNonLocalIp)
    //   .map((ma) => ma.toString());

    // // const ma = [
    // //   '/ip4/123.123.123.123/tpc/1231/gg',
    // //   '/gg/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ'
    // // ]

    // console.log({ multiaddrs });

    // const peerId = peerIdFromString('QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ');
    // const peerInfo = await node.peerRouting.findPeer(peerId);

    // console.info(peerInfo);

    // // const ma = multiaddr(
    // //   '/ip4/0.0.0.0/udp/56093/webrtc/certhash/uEiByaEfNSLBexWBNFZy_QB1vAKEj7JAXDizRs4_SnTflsQ',
    // // );
    // // const stream = await node.dialProtocol(ma, ['/my-protocol/1.0.0']);

    expect(1).toBe(1);
  });
});
