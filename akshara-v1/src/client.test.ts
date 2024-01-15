/// <reference lib="dom" />

import { describe, test } from 'node:test';
import assert from 'node:assert';
import multiaddrFromUri from '@multiformats/uri-to-multiaddr';
import * as secp from '@noble/secp256k1';

import { NodeClientFactory } from './client.js';
import { NodeSigningInterface } from './signing.js';
import { multiaddr } from '@multiformats/multiaddr';
import { TestActor, sleep } from './testing.js';
import { SubscriptionChangeData } from '@libp2p/interface';

describe('Client', () => {
  // describe('SigningInterface', () => {
  //   test('should work', async () => {
  //     const signingInterface = new NodeSigningInterface();
  //     const alice = await signingInterface.createSigner();
  //     const message = new Uint8Array([1, 2, 3]);
  //     const signature = await signingInterface.sign(alice, message);
  //     const verified = await signingInterface.verify(alice, message, signature);
  //     assert.strictEqual(verified, true);
  //   });
  // });
  describe('NodeClient', () => {
    test('asd', async () => {
      // Setup Alice
      const alice = await TestActor.create('alice');
      const aliceLibp2p = alice.client.networkInterface.libp2p;
      // aliceLibp2p.services.pubsub.addEventListener('subscription-change', (event) => {
      //   console.log('alice:subscription-change', event.detail.subscriptions);
      // });

      aliceLibp2p.services.pubsub.addEventListener('message', (message) => {
        console.log(
          `message: ${message.detail.topic}:`,
          new TextDecoder().decode(message.detail.data),
        );
      });
      aliceLibp2p.services.pubsub.subscribe('fruit');

      // console.log('waiting...');

      // await new Promise((resolve) => {
      //   aliceLibp2p.services.pubsub.addEventListener('subscription-change', (event) => {
      //     if (
      //       event.detail.subscriptions.some(
      //         (sub) => sub.topic === 'fruit' && sub.subscribe === true,
      //       )
      //     ) {
      //       console.log(event.detail);
      //       resolve(undefined);
      //     }
      //   });
      // });

      console.log('publishing...');

      let i = 0;
      while (true) {
        i += 1;
        try {
          const asd = await aliceLibp2p.services.pubsub.publish(
            'fruit',
            new TextEncoder().encode(`banana ${i}`),
          );
        } catch (e) {
          console.log((e as any).message);
        }
        await sleep(1000);
      }
    });

    test.skip('should work', async () => {
      // Setup Alice
      const alice = await TestActor.create('alice');
      const aliceLibp2p = alice.client.networkInterface.libp2p;
      // aliceLibp2p.services.pubsub.addEventListener('subscription-change', (event) => {
      //   console.log('alice:subscription-change', event.detail.subscriptions);
      // });

      // aliceLibp2p.services.pubsub.addEventListener('message', (message) => {
      //   console.log(
      //     `message: ${message.detail.topic}:`,
      //     new TextDecoder().decode(message.detail.data),
      //   );
      // });
      aliceLibp2p.services.pubsub.subscribe('fruit');

      // aliceLibp2p.addEventListener('gossipsub:message' as any, (event) => {
      //   console.log('gossipsub:message', event);
      // });

      // aliceLibp2p.addEventListener('peer:identify', (event) => {
      //   console.log('peer:identify', event);
      // });
      // aliceLibp2p.addEventListener('peer:connect', (event) => {
      //   console.log('peer:connect', event);
      // });
      // aliceLibp2p.addEventListener('peer:discovery', (event) => {
      //   console.log('peer:discovery', event);
      // });
      // aliceLibp2p.addEventListener('connection:open', (event) => {
      //   console.log('connection:open', event);
      // });

      // Setup Bob
      const bob = await TestActor.create('bob');
      const bobLibp2p = bob.client.networkInterface.libp2p;
      // bobLibp2p.services.pubsub.addEventListener('subscription-change', (event) => {
      //   console.log('bob:subscription-change', event.detail.subscriptions);
      // });

      bobLibp2p.services.pubsub.subscribe('fruit');

      // Connect Alice and Bob
      // const aliceAddrs = alice.client.getAddresses();
      // const conn = await bobLibp2p.dial(aliceAddrs[0]);
      // const result = await bobLibp2p.services.identify.identify(conn);
      // console.log(result);
      // console.log(conn);
      // const pingRTT = await bob.client.networkInterface.libp2p.services.ping.ping(aliceAddrs[0]);
      // console.log(pingRTT);

      console.log('waiting...');

      await new Promise((resolve) => {
        bobLibp2p.services.pubsub.addEventListener('subscription-change', (event) => {
          if (
            // event.detail.peerId === conn.remotePeer &&
            event.detail.subscriptions.some(
              (sub) => sub.topic === 'fruit' && sub.subscribe === true,
            )
          ) {
            console.log(event.detail);
            resolve(undefined);
          }
        });
      });

      console.log('publishing...');

      const messagePromise = new Promise((resolve) => {
        aliceLibp2p.services.pubsub.addEventListener('message', (event) => {
          if (event.detail.topic === 'fruit') {
            const message = new TextDecoder().decode(event.detail.data);
            resolve(message);
          }
        });
      });

      const asd2 = await bobLibp2p.services.pubsub.getSubscribers('fruit');
      console.log('asd2', asd2);

      while (true) {
        const asd = await bobLibp2p.services.pubsub.publish(
          'fruit',
          new TextEncoder().encode('banana'),
        );
        if (asd.recipients.length > 0) {
          break;
        }
      }

      console.log('waiting...');

      const message = await messagePromise;

      console.log('asserting...');

      assert.equal(message, 'banana');

      // while (true) {
      //   await sleep(1000);
      //   // await bobLibp2p.services.pubsub.publish('fruit', new TextEncoder().encode('banana'));
      // }
      // const stream = await conn.newStream('/test');
      // await stream.sink([new Uint8Array([1, 2, 3])]);

      // assert.ok(conn);

      // await conn.close();
      await aliceLibp2p.stop();
      await bobLibp2p.stop();
      // await bobLibp2p.hangUp(conn.remotePeer);
      // await alice.stop();
      // await bob.stop();

      console.log('hey2');
      // const signingInterface = new NodeSigningInterface();
      // const alice = await signingInterface.createSigner();
      // const jwk = alice.publicKey.export({
      //   format: 'jwk',
      // });
      // console.log(jwk);
      // const x = Buffer.from(jwk.x!, 'base64url');
      // const y = Buffer.from(jwk.y!, 'base64url');
      // const privKey = secp.utils.randomPrivateKey();
      // console.log(privKey.length);
      // const pubKey = secp.getPublicKey(privKey);
      // console.log(pubKey.length);
      // console.log(y.toString('hex'));
      // console.log(x.toString('hex'));
      // console.log(Buffer.from(pubKey).toString('hex'));
      // const der = new Uint8Array(
      //   alice.publicKey.export({
      //     format: 'der',
      //     type: 'spki',
      //   }),
      // );
      // console.log(der.length);
    });
  });
  // describe('asd', () => {
  //   test.skip('should work', async () => {
  //     // const addr = multiaddrFromUri('https://ethereum.blockpi.network/v1/rpc/public');
  //     const addr = multiaddr('/dns4/ethereum.blockpi.network/tcp/443/https/v1/rpc/public');
  //     console.log(addr.toString());
  //     assert(true);
  //   });
  // });
});
