import assert from 'node:assert';
import { test } from 'node:test';
import { createLibp2p } from 'libp2p';
import { tcp } from '@libp2p/tcp';
// import { gossipsub } from '@chainsafe/libp2p-gossipsub';
import { noise } from '@chainsafe/libp2p-noise';
// import { yamux } from '@chainsafe/libp2p-yamux';
// import { bootstrap } from '@libp2p/bootstrap';
// import { identify } from '@libp2p/identify';
// import { kadDHT } from '@libp2p/kad-dht';
import { mplex } from '@libp2p/mplex';
// import { webRTC, webRTCDirect } from '@libp2p/webrtc';
// import { webSockets } from '@libp2p/websockets';
// import { webTransport } from '@libp2p/webtransport';
// import { multiaddr } from '@multiformats/multiaddr';
import { createHelia } from 'helia';
import { createSecp256k1PeerId } from '@libp2p/peer-id-factory';
// import {} from '@chainsafe/discv5';
import { peerIdFromKeys } from '@libp2p/peer-id';

test('test', async () => {
  // const node = await createLibp2p({
  //   addresses: {
  //     listen: ['/ip4/127.0.0.1/tcp/0'],
  //   },
  //   transports: [tcp()],
  //   connectionEncryption: [noise()],
  //   streamMuxers: [mplex()],
  // });
  const peerId = await createSecp256k1PeerId();
  const node = await createHelia({
    libp2p: {
      peerId,
      services: {},
    },
    start: false,
  });

  // node.libp2p.addEventListener('peer:discovery', (event) => {
  //   console.log('peer:discovery', event);
  // });

  node.libp2p.addEventListener('peer:identify', (event) => {
    console.log('peer:identify', event);
  });

  await node.start();

  console.log('started');

  // const addrs = node.libp2p.getMultiaddrs();
  // console.log(addrs);
  await node.stop();
  assert(true);
});
