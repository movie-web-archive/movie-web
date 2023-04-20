import { MWMediaType } from "@/backend/metadata/types";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useControls } from "@/video/state/logic/controls";
import { useProgress } from "@/video/state/logic/progress";
import { useEffect, useMemo, useRef } from "react";
// import { VideoMetaEvent, useMeta } from "@/video/state/logic/meta";
import { useCurrentSeriesEpisodeInfo } from "../hooks/useCurrentSeriesEpisodeInfo";

export default function MediaSessionInternal() {
  const descriptor = useVideoPlayerDescriptor();
  // const meta = useMeta(descriptor);
  const { currentEpisodeInfo, currentSeasonInfo, meta } =
    useCurrentSeriesEpisodeInfo(descriptor);
  const currentEpisodeInfoMemo = useMemo(
    () => currentEpisodeInfo,
    [currentEpisodeInfo]
  );
  const controlsRef = useRef(useControls(descriptor));
  const progressRef = useRef(useProgress(descriptor));
  const mediaSessionRef = useRef<MediaSession | null>(null);

  // useEffect(() => {
  //   controlsRef.current = controls;
  //   progressRef.current = progress;
  //   metaRef.current = metadata;
  // }, [progress, controls, metadata]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    mediaSessionRef.current = navigator.mediaSession;
    const controlsRefCurrent = controlsRef.current;
    const progressRefCurrent = progressRef.current;
    const mediaSession = mediaSessionRef.current;
    mediaSession.setActionHandler("play", () => controlsRefCurrent.play());
    mediaSession.setActionHandler("pause", () => controlsRefCurrent.pause());
    const seekTime = 20; // this could be a setting
    mediaSession.setActionHandler("seekbackward", () => {
      if (progressRefCurrent.time < seekTime) {
        controlsRefCurrent.setTime(0);
      } else {
        controlsRefCurrent.setTime(progressRefCurrent.time - seekTime);
      }
    });

    mediaSession.setActionHandler("seekforward", () => {
      if (progressRefCurrent.time + seekTime > progressRefCurrent.duration) {
        controlsRefCurrent.setTime(progressRefCurrent.duration);
      } else {
        controlsRefCurrent.setTime(progressRefCurrent.time + seekTime);
      }
    });
    return () => {
      // mediaSession.metadata = null;
      mediaSession.playbackState = "none";
      mediaSession.setActionHandler("play", null);
      mediaSession.setActionHandler("pause", null);
      mediaSession.setActionHandler("seekbackward", null);
      mediaSession.setActionHandler("seekforward", null);
    };
  }, []);

  useEffect(() => {
    if (mediaSessionRef.current === null) return;
    if (!meta) return;
    const media = meta.meta;
    let artwork: any[] = [];
    if (media.poster) {
      artwork = [
        // for low end devices
        {
          src: media.poster,
          sizes: "256x256",
          type: "image/png",
        },
        // for high end devices
        {
          src: media.poster,
          sizes: "512x512",
          type: "image/png",
        },
      ];
    }
    const mediaSession = mediaSessionRef.current;
    mediaSession.metadata = new MediaMetadata({ artwork });
    if (media.type === MWMediaType.MOVIE) {
      mediaSession.metadata.title = media.title;
      if (media.year) {
        mediaSession.metadata.artist = media.year;
      }
    }
    if (media.type === MWMediaType.SERIES) {
      // const currentEpisodeId =
      // const currentSeason = media.seasonData;
      // const currentEpisode = currentSeason.episodes.find(
      //   (episode) => episode.id === currentEpisodeId
      // );
      if (currentEpisodeInfo) {
        mediaSession.metadata.title = currentEpisodeInfo.title;
      }
      if (currentSeasonInfo) {
        mediaSession.metadata.artist = currentSeasonInfo.title;
      }
      mediaSession.metadata.album = media.title;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEpisodeInfoMemo]);

  return null;
}
