import { SyntheticEvent } from "react";

import { FloatingCardView } from "@/components/popout/FloatingCard";
import { FloatingDragHandle } from "@/components/popout/FloatingDragHandle";
import { FloatingView } from "@/components/popout/FloatingView";
import { useFloatingRouter } from "@/hooks/useFloatingRouter";
import { CaptionsSelectionAction } from "@/video/components/actions/list-entries/CaptionsSelectionAction";
import { DownloadAction } from "@/video/components/actions/list-entries/DownloadAction";
import { PlaybackSpeedSelectionAction } from "@/video/components/actions/list-entries/PlaybackSpeedSelectionAction";
import { SourceSelectionAction } from "@/video/components/actions/list-entries/SourceSelectionAction";

import { CaptionSelectionPopout } from "./CaptionSelectionPopout";
import { CaptionSettingsPopout } from "./CaptionSettingsPopout";
import { PlaybackSpeedPopout } from "./PlaybackSpeedPopout";
import { QualitySelectionPopout } from "./QualitySelectionPopout";
import { SourceSelectionPopout } from "./SourceSelectionPopout";

export function SettingsPopout() {
  const floatingRouter = useFloatingRouter();
  const { pageProps, navigate } = floatingRouter;

  return (
    <>
      <FloatingView {...pageProps("/")} width={320}>
        <FloatingDragHandle />
        <FloatingCardView.Content>
          <DownloadAction />
          <SourceSelectionAction
            onClick={() => navigate("/source")}
            onQuality={(e: SyntheticEvent) => {
              e.stopPropagation();
              navigate("/quality");
            }}
          />
          <CaptionsSelectionAction onClick={() => navigate("/captions")} />
          <PlaybackSpeedSelectionAction
            onClick={() => navigate("/playback-speed")}
          />
        </FloatingCardView.Content>
      </FloatingView>
      <SourceSelectionPopout router={floatingRouter} prefix="source" />
      <QualitySelectionPopout router={floatingRouter} prefix="quality" />
      <CaptionSelectionPopout router={floatingRouter} prefix="captions" />
      <CaptionSettingsPopout
        router={floatingRouter}
        prefix="caption-settings"
      />
      <PlaybackSpeedPopout router={floatingRouter} prefix="playback-speed" />
    </>
  );
}
