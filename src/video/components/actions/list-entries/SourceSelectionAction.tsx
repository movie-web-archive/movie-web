import { useTranslation } from "react-i18next";

import { Icons } from "@/components/Icon";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useSource } from "@/video/state/logic/source";

import { PopoutListAction } from "../../popouts/PopoutUtils";

interface Props {
  onClick?: () => any;
}

export function CurrentSource() {
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

export function SourceSelectionAction(props: Props) {
  const { t } = useTranslation();

  return (
    <PopoutListAction
      icon={Icons.CLAPPER_BOARD}
      onClick={props.onClick}
      right={<CurrentSource />}
      noChevron
    >
      {t("videoPlayer.buttons.source")}
    </PopoutListAction>
  );
}
