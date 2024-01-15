import type { KeyObject } from 'crypto';
import { promisify } from 'util';
import { createSign, createVerify, generateKeyPair } from 'crypto';

import type { Bytes, Signer, SigningInterface } from './spec.js';

const promisifiedGenerateKeyPair = promisify(generateKeyPair);

export class NodeSigner implements Signer {
  constructor(public readonly publicKey: KeyObject) {}
}

export class NodeSigningInterface implements SigningInterface {
  private privateKeys = new Map<KeyObject, KeyObject>();
  /** @deprecated */
  get _privateKeys() {
    return this.privateKeys;
  }
  constructor() {}
  async createSigner(): Promise<Signer> {
    const { privateKey, publicKey } = await promisifiedGenerateKeyPair('ec', {
      // namedCurve: 'sect239k1',
      namedCurve: 'secp256k1',
    });
    this.privateKeys.set(publicKey, privateKey);
    return new NodeSigner(publicKey);
  }
  async sign(signer: Signer, message: Bytes): Promise<Bytes> {
    const privateKey = this.privateKeys.get(signer.publicKey);
    if (!privateKey) throw new Error('Invalid signer');
    const sign = createSign('SHA256');
    sign.write(message);
    sign.end();
    const signature = sign.sign(privateKey, 'hex');
    return Uint8Array.from(Buffer.from(signature, 'hex'));
  }
  async verify(signer: Signer, message: Bytes, signature: Bytes): Promise<boolean> {
    const verify = createVerify('SHA256');
    verify.write(message);
    verify.end();
    return verify.verify(signer.publicKey, Buffer.from(signature));
  }
}
