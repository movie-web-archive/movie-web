import { useTranslation } from "react-i18next";

import { MWStreamQuality, MWStreamType } from "@/backend/helpers/streams";
import { Icons } from "@/components/Icon";
import { normalizeTitle } from "@/utils/normalizeTitle";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useMeta } from "@/video/state/logic/meta";
import { useSource } from "@/video/state/logic/source";

import { PopoutListAction } from "../../popouts/PopoutUtils";

export function DownloadAction() {
  const descriptor = useVideoPlayerDescriptor();
  const sourceInterface = useSource(descriptor);
  const { t } = useTranslation();
  const meta = useMeta(descriptor);

  const title = meta?.meta.meta.title;

  return (
    <PopoutListAction
      href={sourceInterface.source?.url}
      download={title ? `${normalizeTitle(title)}.mp4` : undefined}
      icon={Icons.DOWNLOAD}
      right={
        sourceInterface.source?.quality !== MWStreamQuality.QUNKNOWN ? (
          <div className="rounded-md bg-denim-300 px-2 py-1 transition-colors">
            <p className="text-center text-xs font-bold text-slate-300 transition-colors">
              {sourceInterface.source?.quality}
            </p>
          </div>
        ) : null
      }
      noChevron
    >
      {t("videoPlayer.buttons.download")}
    </PopoutListAction>
  );
}
