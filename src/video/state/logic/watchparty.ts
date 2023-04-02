import { useEffect, useState } from "react";
import { getPlayerState } from "../cache";
import { listenEvent, sendEvent, unlistenEvent } from "../events";
import { VideoPlayerState, WatchPartyState } from "../types";

export type VideoWatchParty = WatchPartyState;

function getWatchPartyFromState(state: VideoPlayerState): VideoWatchParty {
  return {
    connection: state.watchParty.connection,
    peers: state.watchParty.peers,
    isInParty: state.watchParty.isInParty,
    roomId: state.watchParty.roomId,
    isHost: state.watchParty.isHost,
  };
}

export function updateWatchParty(descriptor: string, state: VideoPlayerState) {
  sendEvent<VideoWatchParty>(
    descriptor,
    "watchparty",
    getWatchPartyFromState(state)
  );
}

export function useWatchParty(descriptor: string): VideoWatchParty {
  const state = getPlayerState(descriptor);
  const [data, setData] = useState<VideoWatchParty>(
    getWatchPartyFromState(state)
  );

  useEffect(() => {
    function update(payload: CustomEvent<VideoWatchParty>) {
      setData(payload.detail);
    }
    listenEvent(descriptor, "watchparty", update);
    return () => {
      unlistenEvent(descriptor, "watchparty", update);
    };
  }, [descriptor]);

  return data;
}
