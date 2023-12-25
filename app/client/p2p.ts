'use client';
import 'client-only';
import { noise } from '@chainsafe/libp2p-noise';
// import { mdns } from '@libp2p/mdns';
import { bootstrap } from '@libp2p/bootstrap';
import { kadDHT, removePrivateAddressesMapper } from '@libp2p/kad-dht';
import { mplex } from '@libp2p/mplex';
// import { tcp } from '@libp2p/tcp';
import { peerIdFromString } from '@libp2p/peer-id';
import { webRTC, webRTCDirect } from '@libp2p/webrtc';
import { multiaddr } from '@multiformats/multiaddr';
import { createLibp2p } from 'libp2p';

async function main() {
  const node = await createLibp2p({
    // peerDiscovery: [mdns()],
    peerDiscovery: [
      bootstrap({
        list: [
          // a list of bootstrap peer multiaddrs to connect to on node startup
          '/ip4/104.131.131.82/tcp/4001/ipfs/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
          '/dnsaddr/bootstrap.libp2p.io/ipfs/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
          '/dnsaddr/bootstrap.libp2p.io/ipfs/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
        ],
        timeout: 1000, // in ms,
        tagName: 'bootstrap',
        tagValue: 50,
        tagTTL: 120000, // in ms
      }),
    ],
    services: {
      // dht: kadDHT({}),
      aminoDHT: kadDHT({
        protocol: '/ipfs/kad/1.0.0',
        peerInfoMapper: removePrivateAddressesMapper,
      }),
    },
    streamMuxers: [mplex()],
    transports: [webRTC()],
    // transports: [tcp()],
    connectionEncryption: [noise()],
  });

  node.addEventListener('peer:discovery', (event) => {
    const peerId = event.detail.id;
    console.log(`Discovered peer ${peerId.toString()}`);
  });

  console.log('Starting libp2p...');
  await node.start();
  console.log('Started libp2p.');

  const peerId = peerIdFromString('QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ');
  const peerInfo = await node.peerRouting.findPeer(peerId);

  console.info(peerInfo);

  // const ma = multiaddr(
  //   '/ip4/0.0.0.0/udp/56093/webrtc/certhash/uEiByaEfNSLBexWBNFZy_QB1vAKEj7JAXDizRs4_SnTflsQ',
  // );
  // const stream = await node.dialProtocol(ma, ['/my-protocol/1.0.0']);
}

main();
