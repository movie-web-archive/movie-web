import { useCallback } from "react";

import { IconPatch } from "@/components/buttons/IconPatch";
import { Icons } from "@/components/Icon";
import { useBookmarkStore } from "@/stores/bookmarks";
import { usePlayerStore } from "@/stores/player/store";
import { MediaItem } from "@/utils/mediaTypes";

import { VideoPlayerButton } from "./Button";

export function BookmarkButton() {
  const addBookmark = useBookmarkStore((s) => s.addBookmark);
  const removeBookmark = useBookmarkStore((s) => s.removeBookmark);
  const bookmarks = useBookmarkStore((s) => s.bookmarks);
  const meta = usePlayerStore((s) => s.meta);
  const isBookmarked = !!bookmarks[meta?.tmdbId ?? ""];

  const toggleBookmark = useCallback(() => {
    if (!meta) return;
    if (isBookmarked) removeBookmark(meta.tmdbId);
    else addBookmark(meta);
  }, [isBookmarked, meta, addBookmark, removeBookmark]);

  return (
    <VideoPlayerButton
      onClick={() => toggleBookmark()}
      icon={isBookmarked ? Icons.BOOKMARK : Icons.BOOKMARK_OUTLINE}
      iconSizeClass="text-base"
      className="p-3"
    />
  );
}

export function MediaCardBookmarkButton(props: { media: MediaItem }) {
  const addBookmark = useBookmarkStore((s) => s.addBookmark);
  const removeBookmark = useBookmarkStore((s) => s.removeBookmark);
  const bookmarks = useBookmarkStore((s) => s.bookmarks);
  const isBookmarked = !!bookmarks[props.media.id];

  const toggleBookmark = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      if (!props.media.year) return;
      if (isBookmarked) {
        removeBookmark(props.media.id);
      } else {
        addBookmark({
          tmdbId: props.media.id,
          title: props.media.title,
          releaseYear: props.media.year,
          type: props.media.type,
          poster: props.media.poster,
        });
      }
    },
    [isBookmarked, props.media, addBookmark, removeBookmark],
  );

  if (!props.media.year) return null;

  return (
    <IconPatch
      clickable
      onClick={toggleBookmark}
      icon={isBookmarked ? Icons.BOOKMARK : Icons.BOOKMARK_OUTLINE}
    />
  );
}
