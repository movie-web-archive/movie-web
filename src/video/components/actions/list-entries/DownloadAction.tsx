import { useTranslation } from "react-i18next";

import { MWStreamType } from "@/backend/helpers/streams";
import { Icons } from "@/components/Icon";
import { normalizeTitle } from "@/utils/normalizeTitle";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useMeta } from "@/video/state/logic/meta";
import { useSource } from "@/video/state/logic/source";

import { PopoutListAction } from "../../popouts/PopoutUtils";

export function CurrentQuality() {
  const descriptor = useVideoPlayerDescriptor();
  const source = useSource(descriptor);

  if (!source.source) return null;

  return (
    <div className="rounded-md bg-denim-300 px-2 py-1 transition-colors">
      <p className="text-center text-xs font-bold text-slate-300 transition-colors">
        {source.source.quality}
      </p>
    </div>
  );
}

export function DownloadAction() {
  const descriptor = useVideoPlayerDescriptor();
  const sourceInterface = useSource(descriptor);
  const { t } = useTranslation();
  const meta = useMeta(descriptor);

  const isHLS = sourceInterface.source?.type === MWStreamType.HLS;

  if (isHLS) return null;

  const title = meta?.meta.meta.title;

  return (
    <PopoutListAction
      href={isHLS ? undefined : sourceInterface.source?.url}
      download={title ? `${normalizeTitle(title)}.mp4` : undefined}
      icon={Icons.DOWNLOAD}
      right={<CurrentQuality />}
      noChevron
    >
      {t("videoPlayer.buttons.download")}
    </PopoutListAction>
  );
}
