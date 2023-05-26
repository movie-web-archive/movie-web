import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { makeCaptionId } from "@/backend/helpers/captions";
import { Icons } from "@/components/Icon";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useMeta } from "@/video/state/logic/meta";
import { useSource } from "@/video/state/logic/source";

import { PopoutListAction } from "../../popouts/PopoutUtils";

interface Props {
  onClick: () => any;
}

function CurrentCaption() {
  const descriptor = useVideoPlayerDescriptor();
  const source = useSource(descriptor);
  const meta = useMeta(descriptor);
  const { t } = useTranslation();

  const linkedCaptions = useMemo(
    () =>
      meta?.captions.map((v) => ({ ...v, id: makeCaptionId(v, true) })) ?? [],
    [meta]
  );
  const captionId = source.source?.caption?.id;
  const captionName =
    linkedCaptions.find((caption) => caption.id === captionId)?.langIso ??
    (captionId === "external-custom"
      ? t("videoPlayer.popouts.customCaption")
      : null);

  if (!captionName) return null;

  return (
    <div className="rounded-md bg-denim-300 px-2 py-1 transition-colors">
      <p className="text-center text-xs font-bold text-slate-300 transition-colors">
        {captionName}
      </p>
    </div>
  );
}

export function CaptionsSelectionAction(props: Props) {
  const { t } = useTranslation();

  return (
    <PopoutListAction
      icon={Icons.CAPTIONS}
      onClick={props.onClick}
      right={<CurrentCaption />}
      noChevron // TODO: Make this false if <CurrentCaption /> returns null
    >
      {t("videoPlayer.buttons.captions")}
    </PopoutListAction>
  );
}
