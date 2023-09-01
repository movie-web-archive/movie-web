import { useCallback } from "react";

import { MWMediaType } from "@/backend/metadata/types/mw";
import { Icons } from "@/components/Icon";
import { FloatingAnchor } from "@/components/popout/FloatingAnchor";
import { VideoPlayerIconButton } from "@/video/components/parts/VideoPlayerIconButton";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useControls } from "@/video/state/logic/controls";
import { useInterface } from "@/video/state/logic/interface";
import { useMeta } from "@/video/state/logic/meta";

interface Props {
  className?: string;
}

export function NextEpisodeAction(props: Props) {
  const descriptor = useVideoPlayerDescriptor();
  const meta = useMeta(descriptor);
  const controls = useControls(descriptor);

  const nextEpisode = useCallback(() => {
    if (!meta?.episode?.episodeId) {
      return;
    }
    let isNext = false;
    let desiredEpisode: { episodeId: string; seasonId: string } | null = null;
    for (const season of meta?.seasons || []) {
      if (desiredEpisode) {
        break;
      }
      for (const episode of season?.episodes || []) {
        if (isNext) {
          desiredEpisode = {
            episodeId: episode.id,
            seasonId: season.id,
          };
          break;
        }
        if (episode.id === meta.episode?.episodeId) {
          isNext = true;
        }
      }
    }

    if (desiredEpisode !== null) {
      const ep = desiredEpisode;
      setTimeout(() => {
        controls.setCurrentEpisode(ep.seasonId, ep.episodeId);
      }, 100);
    }
  }, [meta, controls]);

  if (meta?.meta.meta.type !== MWMediaType.SERIES) return null;

  return (
    <div className={props.className}>
      <div className="relative">
        <FloatingAnchor id="next-episode">
          <VideoPlayerIconButton
            icon={Icons.CHEVRON_RIGHT}
            onClick={() => nextEpisode()}
          />
        </FloatingAnchor>
      </div>
    </div>
  );
}
