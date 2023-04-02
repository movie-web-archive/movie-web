import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useMemo, useEffect, useRef, useCallback } from "react";
import { useProgress } from "@/video/state/logic/progress";
import { useControls } from "@/video/state/logic/controls";
import { useCurrentSeriesEpisodeInfo } from "../hooks/useCurrentSeriesEpisodeInfo";

export function NextEpisodeAction() {
  const descriptor = useVideoPlayerDescriptor();
  const { setCurrentEpisode } = useControls(descriptor);
  const setEpisode = useMemo(() => setCurrentEpisode, [setCurrentEpisode]);
  const videoTime = useProgress(descriptor);
  const almostFinished = useMemo(
    () => videoTime.time > 0.97 * videoTime.duration,
    [videoTime]
  );
  const { currentEpisodeInfo, currentSeasonInfo, isSeries } =
    useCurrentSeriesEpisodeInfo(descriptor);

  const nextEpisode = useMemo(() => {
    if (!currentEpisodeInfo) return null;
    const next = currentSeasonInfo?.episodes?.find(
      (episode) => episode.number === currentEpisodeInfo.number + 1
    );
    return next;
  }, [currentEpisodeInfo, currentSeasonInfo]);

  const timeoutMs = 10_000;
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const handleNextEpisode = useCallback(() => {
    const episodeId = nextEpisode?.id;
    const seasonId = currentSeasonInfo?.id;
    if (episodeId && seasonId) setEpisode(seasonId, episodeId);
  }, [nextEpisode, currentSeasonInfo, setEpisode]);
  useEffect(() => {
    if (!almostFinished) return;
    if (timeout.current) return;
    timeout.current = setTimeout(() => {
      handleNextEpisode();
    }, timeoutMs);
  }, [
    almostFinished,
    nextEpisode,
    currentSeasonInfo,
    setEpisode,
    handleNextEpisode,
  ]);

  if (!isSeries) return null;
  if (!currentEpisodeInfo) return null;
  if (!nextEpisode) return null;
  return (
    <button
      type="button"
      onClick={handleNextEpisode}
      onMouseEnter={() => {
        if (timeout.current) clearTimeout(timeout.current);
      }}
      className={[
        "z-2 absolute bottom-24 right-10 overflow-hidden rounded bg-white py-2 px-2 text-sm font-bold text-black",
        almostFinished ? "" : "hidden",
      ].join(" ")}
    >
      <span className="z-2 relative">Next: {nextEpisode.title}</span>
      <div className="absolute top-0 right-[0px] z-0 h-full w-full animate-fill bg-black bg-opacity-40" />
    </button>
  );
}
