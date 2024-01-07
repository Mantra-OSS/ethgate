/**
 * An Akshara client.
 */
interface Client {
  /**
   * The account the client will work in behalf of.
   *
   * Whenever a signature is required, the client will ask its SigningInterfaces to sign the message.
   */
  readonly signer: Signer;
  /**
   * Interfaces available to the client.
   */
  readonly interfaces: Interface[];
  /**
   * Addresses the client is listening on over all of its NetworkInterfaces.
   */
  getAddresses(): Address[];
  /**
   * Peers the client is connected to.
   */
  getPeers(): Peer[];
}

/**
 * A client for DOM environments.
 *
 * This client would use WebTransport, WebRTC, WebSockets, etc.
 */
interface DomClient extends Client {}

/**
 * A client for Node.js environments.
 *
 * This client would use WebTransport, WebRTC, WebSockets, QUIC, TCP, etc.
 * Since we can use QUIC and TCP, these clients will also be able to act as relays.
 */
interface NodeClient extends Client {}

/**
 * Clients have interfaces to access network, storage and other resources.
 */
interface Interface {}

/**
 * Network interfaces are used to send and receive messages between peers.
 */
interface NetworkInterface extends Interface {}

interface NodeNetworkInterface extends NetworkInterface {}
interface DomNetworkInterface extends NetworkInterface {}

/**
 * Signing interfaces are used to sign messages.
 */
interface SigningInterface extends Interface {}

interface Signer {}

interface ComputeInterface extends Interface {}
interface StorageInterface extends Interface {}

interface Peer {}

interface Address {}
