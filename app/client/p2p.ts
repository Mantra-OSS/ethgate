'use client';
import 'client-only';
import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { bootstrap } from '@libp2p/bootstrap';
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2';
// import { mdns } from '@libp2p/mdns';
import { type Identify, identify } from '@libp2p/identify';
import { kadDHT, removePrivateAddressesMapper } from '@libp2p/kad-dht';
import { mplex } from '@libp2p/mplex';
// import { tcp } from '@libp2p/tcp';
import { peerIdFromString } from '@libp2p/peer-id';
import { type PingService, ping } from '@libp2p/ping';
import { webRTC, webRTCDirect } from '@libp2p/webrtc';
import { webSockets } from '@libp2p/websockets';
import * as filters from '@libp2p/websockets/filters';
import type { Multiaddr } from '@multiformats/multiaddr';
import { multiaddr } from '@multiformats/multiaddr';
import { createLibp2p } from 'libp2p';

async function main() {
  const node = await createLibp2p({
    // peerDiscovery: [mdns()],
    // peerDiscovery: [
    //   bootstrap({
    //     list: [
    //       // a list of bootstrap peer multiaddrs to connect to on node startup
    //       '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
    //       '/dnsaddr/bootstrap.libp2p.io/ipfs/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
    //       '/dnsaddr/bootstrap.libp2p.io/ipfs/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
    //     ],
    //     timeout: 1000, // in ms,
    //     tagName: 'bootstrap',
    //     tagValue: 50,
    //     tagTTL: 120000, // in ms
    //   }),
    // ],
    services: {
      // dht: kadDHT({}),
      // aminoDHT: kadDHT({
      //   protocol: '/ipfs/kad/1.0.0',
      //   peerInfoMapper: removePrivateAddressesMapper,
      // }),
      ping: ping(),
      identify: identify(),
    },
    streamMuxers: [yamux()],
    transports: [
      webRTC(),
      webSockets({ filter: filters.all }),
      circuitRelayTransport({
        discoverRelays: 1,
      }),
    ],
    addresses: {
      listen: ['/webrtc'],
    },
    // transports: [tcp()],
    connectionEncryption: [noise()],
    connectionGater: {
      denyDialMultiaddr: async () => false,
    },
  });

  node.addEventListener('peer:discovery', (event) => {
    const peerId = event.detail.id;
    console.log(`Discovered peer ${peerId.toString()}`);
  });

  console.log('Starting libp2p...');
  await node.start();
  console.log('Started libp2p.');

  const sortByNonLocalIp = (a: Multiaddr, b: Multiaddr): number => {
    if (a.toString().includes('127.0.0.1')) {
      return 1;
    }
    return -1;
  };
  const multiaddrs = node
    .getMultiaddrs()
    .sort(sortByNonLocalIp)
    .map((ma) => ma.toString());

  // const ma = [
  //   '/ip4/123.123.123.123/tpc/1231/gg',
  //   '/gg/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ'
  // ]

  console.log({ multiaddrs });

  const peerId = peerIdFromString('QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ');
  const peerInfo = await node.peerRouting.findPeer(peerId);

  console.info(peerInfo);

  // const ma = multiaddr(
  //   '/ip4/0.0.0.0/udp/56093/webrtc/certhash/uEiByaEfNSLBexWBNFZy_QB1vAKEj7JAXDizRs4_SnTflsQ',
  // );
  // const stream = await node.dialProtocol(ma, ['/my-protocol/1.0.0']);
}

main();

// const asd = await fetch('internet+https://api.github.com/repos/ChainSafe/lodestar/releases/latest');
// const asd = await fetch('gg+https://api.github.com/repos/ChainSafe/lodestar/releases/latest');
