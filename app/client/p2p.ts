'use client';
import 'client-only';
import { noise } from '@chainsafe/libp2p-noise';
import { webRTC } from '@libp2p/webrtc';
import { multiaddr } from '@multiformats/multiaddr';
import { createLibp2p } from 'libp2p';

async function main() {
  const node = await createLibp2p({
    transports: [webRTC()],
    connectionEncryption: [noise()],
  });

  node.addEventListener('peer:discovery', (event) => {
    const peerId = event.detail.id;
    console.log(`Discovered peer ${peerId.toString()}`);
  });

  console.log('Starting libp2p...');
  await node.start();
  console.log('Started libp2p.');

  const ma = multiaddr(
    '/ip4/0.0.0.0/udp/56093/webrtc/certhash/uEiByaEfNSLBexWBNFZy_QB1vAKEj7JAXDizRs4_SnTflsQ',
  );
  const stream = await node.dialProtocol(ma, ['/my-protocol/1.0.0']);
}

main();
