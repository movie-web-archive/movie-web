import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useMediaPlaying } from "@/video/state/logic/mediaplaying";
import { useMisc } from "@/video/state/logic/misc";
import { useSource } from "@/video/state/logic/source";
import { setProvider, unsetStateProvider } from "@/video/state/providers/utils";
import { createWatchPartyStateProvider } from "@/video/state/providers/watchPartyStateProvider";
import { useEffect, useMemo, useRef } from "react";

interface Props {
  autoPlay?: boolean;
}

export function WatchPartyInternal(props: Props) {
  const descriptor = useVideoPlayerDescriptor();
  const mediaPlaying = useMediaPlaying(descriptor);
  const source = useSource(descriptor);
  const misc = useMisc(descriptor);
  const lastValue = useRef<boolean>(false);
  const ref = useRef<HTMLVideoElement>(null);

  const isInParty = useMemo(() => misc.isInParty, [misc]);

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
