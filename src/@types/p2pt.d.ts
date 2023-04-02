// Copyright 2020 Subin Siby
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
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
