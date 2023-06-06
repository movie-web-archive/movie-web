import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";

import {
  getCaptionUrl,
  makeCaptionId,
  parseSubtitles,
} from "@/backend/helpers/captions";
import { MWCaption, MWCaptionType } from "@/backend/helpers/streams";
import { FloatingCardView } from "@/components/popout/FloatingCard";
import { FloatingView } from "@/components/popout/FloatingView";
import { useFloatingRouter } from "@/hooks/useFloatingRouter";
import { useLoading } from "@/hooks/useLoading";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useControls } from "@/video/state/logic/controls";
import { useMeta } from "@/video/state/logic/meta";
import { useSource } from "@/video/state/logic/source";

import { ParsedCaptionLanguages } from "./CaptionSearchPopout";
import { PopoutListAction, PopoutSection } from "./PopoutUtils";

export function DetailedCaptionSearchPopout(props: {
  router: ReturnType<typeof useFloatingRouter>;
  prefix: string;
  captionLanguages: ParsedCaptionLanguages | null;
  currentLanguage: string | null;
}) {
  const { t } = useTranslation();
  const descriptor = useVideoPlayerDescriptor();
  const meta = useMeta(descriptor);
  const source = useSource(descriptor);
  const controls = useControls(descriptor);
  const linkedCaptions = useMemo(
    () =>
      meta?.captions.map((v) => ({ ...v, id: makeCaptionId(v, true) })) ?? [],
    [meta]
  );
  const loadingId = useRef<string>("");
  const [setCaption, loading, error] = useLoading(
    async (caption: MWCaption, isLinked: boolean) => {
      const id = makeCaptionId(caption, isLinked);
      loadingId.current = id;

      const blobUrl = await getCaptionUrl(caption);
      const result = await fetch(blobUrl);
      const text = await result.json();

      parseSubtitles(text.data.file);
      controls.setCaption(id, blobUrl);
      setTimeout(() => {
        controls.closePopout();
      }, 100);
    }
  );

  if (!props.currentLanguage) return null;
  if (!props.captionLanguages) return null;

  const currentLanguageCaptions = props.captionLanguages.find(
    (captionLanguage) => captionLanguage.name === props.currentLanguage
  );

  if (!currentLanguageCaptions) return null;

  const uniqueCaptions = currentLanguageCaptions.captions.filter(
    (caption, index, self) => {
      // Check if the path has already been encountered
      return index === self.findIndex((c) => c.path === caption.path);
    }
  );

  return (
    <FloatingView
      {...props.router.pageProps(props.prefix)}
      width={320}
      height={500}
    >
      <FloatingCardView.Header
        title="Captions search"
        description={`Choose a subtitle under ${props.currentLanguage}`}
        goBack={() => props.router.navigate("/caption-search")}
      />
      <FloatingCardView.Content noSection>
        <PopoutSection>
          {uniqueCaptions.map((caption) => (
            <PopoutListAction
              key={caption.path}
              onClick={() => {
                const customSubtitle = {
                  langIso: "custom",
                  url: `https://www.justchill.tv/api/subsence/download?url=${caption.path}`,
                  type: MWCaptionType.SRT,
                  needsProxy: true,
                };
                setCaption(customSubtitle, false);
              }}
            >
              {caption.title}
            </PopoutListAction>
          ))}
        </PopoutSection>
      </FloatingCardView.Content>
    </FloatingView>
  );
}
