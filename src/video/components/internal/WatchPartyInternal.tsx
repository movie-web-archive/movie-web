import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useMediaPlaying } from "@/video/state/logic/mediaplaying";
import { useSource } from "@/video/state/logic/source";
import { useWatchParty } from "@/video/state/logic/watchparty";
import { setProvider, unsetStateProvider } from "@/video/state/providers/utils";
import {
  createWatchPartyStateProvider,
  joinRoom,
} from "@/video/state/providers/watchPartyStateProvider";
import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";

interface Props {
  autoPlay?: boolean;
}

export function WatchPartyInternal(props: Props) {
  const descriptor = useVideoPlayerDescriptor();
  const mediaPlaying = useMediaPlaying(descriptor);
  const source = useSource(descriptor);
  const watchParty = useWatchParty(descriptor);
  const lastValue = useRef<boolean>(false);
  const ref = useRef<HTMLVideoElement>(null);
  const { roomId } = useParams<{ roomId?: string }>();
  const isInParty = useMemo(() => watchParty.isInParty, [watchParty.isInParty]);
  const isConnected = useRef(false);

  useEffect(() => {
    if (lastValue.current === isInParty) return;
    if (!ref.current) return;
    lastValue.current = isInParty;
    if (!isInParty) return;
    const provider = createWatchPartyStateProvider(descriptor, ref.current);
    setProvider(descriptor, provider);
    const { destroy } = provider.providerStart();
    return () => {
      try {
        unsetStateProvider(descriptor, provider.getId());
      } catch {
        // ignore errors from missing player state, we need to run destroy()!
      }
      destroy();
    };
  }, [descriptor, isInParty]);

  // responsible for joining the room with the roomId param from url
  useEffect(() => {
    const isHost = !roomId;
    if (isHost) return;
    if (isConnected.current) return;

    if (!isInParty) {
      joinRoom(roomId, descriptor);
      isConnected.current = true;
    }
  }, [roomId, isInParty, descriptor, isConnected]);

  // this element is remotely controlled by a state provider
  if (!isInParty) return null;
  return (
    <video
      ref={ref}
      autoPlay={props.autoPlay}
      muted={mediaPlaying.volume === 0}
      playsInline
      className="h-full w-full"
    >
      {source.source?.caption ? (
        <track default kind="captions" src={source.source.caption.url} />
      ) : null}
    </video>
  );
}
