import { PlayerMeta } from "@/stores/player/slices/source";

export function getMobileAppLink(meta: PlayerMeta) {
  const url = new URL("movieweb://videoPlayer");

  url.searchParams.set("type", meta.type === "movie" ? "movie" : "tv");
  url.searchParams.set("id", meta.tmdbId);

  const isShow = meta.type === "show";
  if (isShow && meta.season?.number) {
    url.searchParams.set("season", meta.season?.number.toString());
  }
  if (isShow && meta.episode?.number) {
    url.searchParams.set("episode", meta.episode.number.toString());
  }

  return url.toString();
}
