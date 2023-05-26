import { useTranslation } from "react-i18next";

import { Icons } from "@/components/Icon";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useMediaPlaying } from "@/video/state/logic/mediaplaying";

import { PopoutListAction } from "../../popouts/PopoutUtils";

interface Props {
  onClick: () => any;
}

function CurrentPlaybackSpeed() {
  const descriptor = useVideoPlayerDescriptor();
  const mediaplaying = useMediaPlaying(descriptor);

  return (
    <div className="rounded-md bg-denim-300 px-2 py-1 transition-colors">
      <p className="text-center text-xs font-bold text-slate-300 transition-colors">
        {`${mediaplaying.playbackSpeed}x`}
      </p>
    </div>
  );
}

export function PlaybackSpeedSelectionAction(props: Props) {
  const { t } = useTranslation();

  return (
    <PopoutListAction
      icon={Icons.TACHOMETER}
      onClick={props.onClick}
      right={<CurrentPlaybackSpeed />}
      noChevron
    >
      {t("videoPlayer.buttons.playbackSpeed")}
    </PopoutListAction>
  );
}
