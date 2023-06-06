import { useState } from "react";

import { FloatingCardView } from "@/components/popout/FloatingCard";
import { FloatingDragHandle } from "@/components/popout/FloatingDragHandle";
import { FloatingView } from "@/components/popout/FloatingView";
import { useFloatingRouter } from "@/hooks/useFloatingRouter";
import { CaptionsSelectionAction } from "@/video/components/actions/list-entries/CaptionsSelectionAction";
import { DownloadAction } from "@/video/components/actions/list-entries/DownloadAction";
import { PlaybackSpeedSelectionAction } from "@/video/components/actions/list-entries/PlaybackSpeedSelectionAction";
import { SourceSelectionAction } from "@/video/components/actions/list-entries/SourceSelectionAction";

import {
  CaptionSearchPopout,
  ParsedCaptionLanguages,
} from "./CaptionSearchPopout";
import { CaptionSelectionPopout } from "./CaptionSelectionPopout";
import { CaptionSettingsPopout } from "./CaptionSettingsPopout";
import { DetailedCaptionSearchPopout } from "./DetailedCaptionSearchPopout";
import { PlaybackSpeedPopout } from "./PlaybackSpeedPopout";
import { SourceSelectionPopout } from "./SourceSelectionPopout";

export function SettingsPopout() {
  const floatingRouter = useFloatingRouter();
  const { pageProps, navigate } = floatingRouter;
  const [captionLanguages, setCaptionLanguages] =
    useState<ParsedCaptionLanguages | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);

  return (
    <>
      <FloatingView {...pageProps("/")} width={320}>
        <FloatingDragHandle />
        <FloatingCardView.Content>
          <DownloadAction />
          <SourceSelectionAction onClick={() => navigate("/source")} />
          <CaptionsSelectionAction onClick={() => navigate("/captions")} />
          <PlaybackSpeedSelectionAction
            onClick={() => navigate("/playback-speed")}
          />
        </FloatingCardView.Content>
      </FloatingView>
      <SourceSelectionPopout router={floatingRouter} prefix="source" />
      <CaptionSelectionPopout router={floatingRouter} prefix="captions" />
      <CaptionSearchPopout
        router={floatingRouter}
        prefix="caption-search"
        setCaptionLanguages={setCaptionLanguages}
        captionLanguages={captionLanguages}
        setCurrentLanguage={setCurrentLanguage}
      />
      <DetailedCaptionSearchPopout
        router={floatingRouter}
        prefix="detailed-caption-search"
        captionLanguages={captionLanguages}
        currentLanguage={currentLanguage}
      />
      <CaptionSettingsPopout
        router={floatingRouter}
        prefix="caption-settings"
      />
      <PlaybackSpeedPopout router={floatingRouter} prefix="playback-speed" />
    </>
  );
}
