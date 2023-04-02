import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useLocation } from "react-router-dom";
import { useWatchParty } from "@/video/state/logic/watchparty";
import { Icons } from "@/components/Icon";
import {
  createRoom,
  leaveRoom,
} from "@/video/state/providers/watchPartyStateProvider";
import { PopoutListAction } from "../popouts/PopoutUtils";

export function WatchPartyAction() {
  const descriptor = useVideoPlayerDescriptor();
  const location = useLocation();
  const watchParty = useWatchParty(descriptor);
  return (
    <PopoutListAction
      icon={Icons.WATCH_PARTY}
      onClick={() => {
        if (watchParty.isInParty) {
          leaveRoom(descriptor);
        } else {
          const roomId = createRoom(descriptor);
          console.log("roomId", roomId);

          console.log(
            `${`${window.location.origin}/#${location.pathname}`}/${roomId}`
          );
        }
      }}
      noChevron
    >
      {watchParty.isInParty
        ? `Leave room: ${watchParty.roomId} ${watchParty.peers?.size}`
        : "Watch Party"}
    </PopoutListAction>
  );
}
