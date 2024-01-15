import { Multiaddr } from '@multiformats/multiaddr';
import type { KeyObject } from 'crypto';

export type Bytes = Uint8Array;

/**
 * An Akshara client.
 */
export interface Client {
  /**
   * The account the client will work in behalf of.
   *
   * Whenever a signature is required, the client will ask its SigningInterfaces to sign the message.
   */
  readonly signer: Signer;
  /**
   * Interfaces available to the client.
   */
  // readonly interfaces: Interface[];
  readonly networkInterface: NetworkInterface;
  /**
   * Addresses the client is listening on over all of its NetworkInterfaces.
   */
  getAddresses(): Multiaddr[];
  /**
   * Peers the client is connected to.
   */
  getPeers(): Peer[];
}

/**
 * Clients have interfaces to access network, storage and other resources.
 */
export interface Interface {}

/**
 * Network interfaces are used to send and receive messages between peers.
 */
export interface NetworkInterface extends Interface {}

/**
 * A network interface for DOM environments.
 *
 * This would use WebTransport, WebRTC, WebSockets, etc.
 */
export interface DomNetworkInterface extends NetworkInterface {}

/**
 * A network interface for Node.js environments.
 *
 * This would use WebTransport, WebRTC, WebSockets, QUIC, TCP, etc.
 * Since we can use QUIC and TCP, these clients will also be able to act as relays.
 */
export interface NodeNetworkInterface extends NetworkInterface {}

/**
 * Signing interfaces are used to sign messages.
 */
export interface SigningInterface extends Interface {
  /**
   * Create a new signer.
   */
  createSigner(): Promise<Signer>;
  /**
   * Sign a message.
   */
  sign(signer: Signer, message: Bytes): Promise<Bytes>;
  /**
   * Verify a signature.
   */
  verify(signer: Signer, message: Bytes, signature: Bytes): Promise<boolean>;
}

export interface Signer {
  /**
   * The public key of the signer.
   */
  readonly publicKey: KeyObject;
}

export interface ComputeInterface extends Interface {}
export interface StorageInterface extends Interface {}

export interface Peer {}
