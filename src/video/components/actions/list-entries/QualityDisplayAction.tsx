import { SyntheticEvent } from "react";

import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useSource } from "@/video/state/logic/source";

export function QualityDisplayAction(props: {
  onQuality?: (e: SyntheticEvent) => void;
}) {
  const descriptor = useVideoPlayerDescriptor();
  const source = useSource(descriptor);

  if (!source.source) return null;

  return (
    <div
      className="rounded-md bg-denim-300 px-2 py-1 transition-colors"
      onClick={(event) => {
        if (props.onQuality && source.source?.sources?.length)
          props.onQuality(event);
      }}
    >
      <p className="text-center text-xs font-bold text-slate-300 transition-colors">
        {source.source.quality}
      </p>
    </div>
  );
}
