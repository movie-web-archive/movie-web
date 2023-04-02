import { getPlayerState } from "@/video/state/cache";
import { Peer } from "@/@types/p2pt";
import { VideoPlayerStateProvider } from "./providerTypes";
import { createVideoStateProvider } from "./videoStateProvider";
import { updateWatchParty } from "../logic/watchparty";

export type WPPlayerCommand =
  | {
      type: "play" | "pause";
    }
  | {
      type: "seek";
      time: number;
    }
  | {
      type: "chat";
      message: string;
    };
export function joinRoom(room: string, descriptor: string) {
  const state = getPlayerState(descriptor);
  const peers = new Set<Peer<WPPlayerCommand>>();
  const p2p = new window.P2PT<WPPlayerCommand>([
    "wss://tracker.openwebtorrent.com",
  ]);
  p2p.setIdentifier(room);
  p2p.once("trackerconnect", () => {
    console.count("Tracker connected");
    state.watchParty.roomId = room;
    state.watchParty.connection = p2p;
    state.watchParty.peers = peers;
    state.watchParty.isInParty = true;
    updateWatchParty(descriptor, state);
  });
  p2p.once("trackerwarning", () => {
    console.log("Tracker warning");
  });
  p2p.on("peerconnect", (peer) => {
    console.log(`Peer connected ${peer.id}`);
    if (!peers.has(peer)) peers.add(peer);
    console.log(peers);
  });
  p2p.on("peerclose", (peer) => {
    console.log(`Peer closed${peer.id}`);
    if (peers.has(peer)) peers.delete(peer);
    console.log(peers);
  });
  p2p.on("msg", (peer, msg: any) => {
    switch (msg.type) {
      case "play":
        state.stateProvider?.play();
        break;
      case "pause":
        state.stateProvider?.pause();
        break;
      case "seek":
        state.stateProvider?.setTime(msg.time);
        break;
      default:
        break;
    }
  });
  p2p.start();
}

export function createRoom(descriptor: string) {
  const roomId = Math.random().toString(36).substring(2, 15);
  const state = getPlayerState(descriptor);
  const peers = new Set<Peer<WPPlayerCommand>>();
  const p2p = new window.P2PT<WPPlayerCommand>([
    "wss://tracker.openwebtorrent.com",
  ]);

  p2p.setIdentifier(roomId);
  state.watchParty.roomId = roomId;

  p2p.once("trackerconnect", () => {
    state.watchParty.isInParty = true;
    state.watchParty.isHost = true;
    state.watchParty.connection = p2p;
    state.watchParty.peers = peers;
    updateWatchParty(descriptor, state);
  });
  p2p.once("trackerwarning", (error, stats) => {
    if (stats.connected === 0) {
      state.watchParty.isInParty = false;
      state.watchParty.connection = p2p;
      state.watchParty.peers = peers;
      updateWatchParty(descriptor, state);
    }
  });
  p2p.on("peerconnect", (peer) => {
    console.log(`Peer connected ${peer.id}`);
    if (!peers.has(peer)) peers.add(peer);
    p2p.send(peer, {
      type: "seek",
      time: state.progress.time,
    });
    if (!state.mediaPlaying.isPlaying) {
      p2p.send(peer, { type: "pause" });
    }
  });
  p2p.on("peerclose", (peer) => {
    if (peers.has(peer)) peers.delete(peer);
  });
  p2p.on("msg", (peer, msg: any) => {
    switch (msg.type) {
      case "play":
        state.stateProvider?.play();
        break;
      case "pause":
        state.stateProvider?.pause();
        break;
      case "seek":
        state.stateProvider?.setTime(msg.time);
        break;
      default:
        break;
    }
  });
  p2p.start();
  return roomId;
}

export function leaveRoom(descriptor: string) {
  const state = getPlayerState(descriptor);
  state.watchParty.connection?.destroy();
  state.watchParty.connection = null;
  state.watchParty.peers?.clear();
  state.watchParty.isInParty = false;
  updateWatchParty(descriptor, state);
}

export function createWatchPartyStateProvider(
  descriptor: string,
  playerEl: HTMLVideoElement
): VideoPlayerStateProvider {
  const provider = createVideoStateProvider(descriptor, playerEl);
  const state = getPlayerState(descriptor);
  const peers = state.watchParty.peers ?? new Set();
  const p2p =
    state.watchParty.connection ??
    new window.P2PT<WPPlayerCommand>(["wss://tracker.openwebtorrent.com"]);
  return {
    getId() {
      return "watchparty";
    },
    play() {
      provider.play();
      console.log("Sending play");
      if (state.watchParty.isHost)
        peers.forEach((peer) => {
          p2p.send(peer, { type: "play" }).then(() => {
            peer.respond({ type: "seek", time: state.progress.time });
          });
        });
    },
    pause() {
      provider.pause();
      if (state.watchParty.isHost)
        peers.forEach((peer) => {
          p2p.send(peer, { type: "pause" });
        });
    },
    exitFullscreen() {
      provider.exitFullscreen();
    },
    enterFullscreen() {
      provider.enterFullscreen();
    },
    startAirplay() {
      provider.startAirplay();
    },
    setTime(t) {
      provider.setTime(t);
      if (state.watchParty.isHost)
        peers.forEach((peer) => {
          p2p.send(peer, { type: "seek", time: t });
        });
    },
    setSeeking(active) {
      provider.setSeeking(active);
    },
    setVolume(v) {
      provider.setVolume(v);
    },
    setSource(source) {
      provider.setSource(source);
    },
    setCaption(id, url) {
      provider.setCaption(id, url);
    },
    clearCaption() {
      provider.clearCaption();
    },
    togglePictureInPicture() {
      // dont do anything
    },
    providerStart() {
      const { destroy } = provider.providerStart();
      return {
        destroy: () => {
          console.log("Destroying watch party");
          leaveRoom(descriptor);
          destroy();
        },
      };
    },
  };
}
