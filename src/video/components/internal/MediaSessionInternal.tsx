import { MWMediaType } from "@/backend/metadata/types";
import { getPlayerState } from "@/video/state/cache";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useEffect } from "react";

export default function MediaSessionInternal() {
  const descriptor = useVideoPlayerDescriptor();
  const state = getPlayerState(descriptor);
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const stateProvider = state.stateProvider;
    if (!stateProvider) return;
    if (!state.meta) return;
    let artwork: any[] = [];
    if (state.meta.meta.meta.poster) {
      artwork = [
        // for low end devices
        {
          src: state.meta.meta.meta.poster,
          sizes: "256x256",
          type: "image/png",
        },
        // for high end devices
        {
          src: state.meta.meta.meta.poster,
          sizes: "512x512",
          type: "image/png",
        },
      ];
    }
    const mediaSession = navigator.mediaSession;
    mediaSession.metadata = new MediaMetadata({ artwork });
    if (state.meta.meta.meta.type === MWMediaType.MOVIE) {
      mediaSession.metadata.title = state.meta.meta.meta.title;
      if (state.meta.meta.meta.year) {
        mediaSession.metadata.artist = state.meta.meta.meta.year;
      }
    }
    if (state.meta.meta.meta.type === MWMediaType.SERIES) {
      const currentEpisodeId = state.meta.episode?.episodeId;
      const currentSeason = state.meta.meta.meta.seasonData;
      const currentEpisode = currentSeason.episodes.find(
        (episode) => episode.id === currentEpisodeId
      );
      if (currentEpisode) {
        mediaSession.metadata.title = currentEpisode.title;
      }
      mediaSession.metadata.artist = currentSeason.title;
      mediaSession.metadata.album = state.meta.meta.meta.title;
    }
    mediaSession.setActionHandler("play", () => stateProvider.play());
    mediaSession.setActionHandler("pause", () => stateProvider.pause());
    const seekTime = 20; // this could be a setting
    mediaSession.setActionHandler("seekbackward", () => {
      if (state.progress.time < seekTime) {
        stateProvider.setTime(0);
      } else {
        stateProvider.setTime(state.progress.time - seekTime);
      }
    });

    mediaSession.setActionHandler("seekforward", () => {
      if (state.progress.time + seekTime > state.progress.duration) {
        stateProvider.setTime(state.progress.duration);
      } else {
        stateProvider.setTime(state.progress.time + seekTime);
      }
    });
    return () => {
      mediaSession.metadata = null;
      mediaSession.playbackState = "none";
      mediaSession.setActionHandler("play", null);
      mediaSession.setActionHandler("pause", null);
      mediaSession.setActionHandler("seekbackward", null);
      mediaSession.setActionHandler("seekforward", null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.stateProvider]);
  return null;
}
