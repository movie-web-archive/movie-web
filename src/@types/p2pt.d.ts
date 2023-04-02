import type { EventEmitter } from "events";

export interface Peer<SendableMessage = any> {
  id: string;
  respond(msg: SendableMessage): Promise<[peer: Peer, msg: any]>;
}
interface Tracker {
  announceUrl: string;
}
interface TrackerStats {
  connected: number;
  total: number;
}
class P2PT<SendableMessage = any> extends EventEmitter {
  _peerId: string;

  constructor(announceURLs?: Array<string>, identifierString?: string): P2PT;

  setIdentifier(identifierString: string): void;

  start(): void;

  requestMorePeers(): void;

  requestMorePeers(): Promise<object>;

  send(
    peer: Peer,
    msg: SendableMessage,
    msgID?: number
  ): Promise<[peer: Peer, msg: object]>;

  addTracker(announceURL: string): void;

  removeTracker(announceURL: string): void;

  getTrackerStats(): TrackerStats;

  destroy(): void;

  on(event: "peerconnect", callback: (peer: Peer) => void): void;

  on(event: "data", callback: (peer: Peer, data: any) => void): void;

  on(event: "msg", callback: (peer: Peer, msg: any) => void): void;

  on(event: "peerclose", callback: (peer: Peer) => void): void;

  on(
    event: "trackerconnect",
    callback: (tracker: Tracker, stats: TrackerStats) => void
  ): void;

  on(
    event: "trackerwarning",
    callback: (error: object, stats: TrackerStats) => void
  ): any;
}

declare global {
  interface Window {
    P2PT: typeof P2PT;
  }
}
