import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { MWEmbedType } from "@/backend/helpers/embed";
import { MWProvider, MWProviderScrapeResult } from "@/backend/helpers/provider";
import { getProviders } from "@/backend/helpers/register";
import { runProvider } from "@/backend/helpers/run";
import { MWStream, MWStreamQuality } from "@/backend/helpers/streams";
import { FloatingCardView } from "@/components/popout/FloatingCard";
import { FloatingView } from "@/components/popout/FloatingView";
import { useFloatingRouter } from "@/hooks/useFloatingRouter";
import { useLoading } from "@/hooks/useLoading";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useControls } from "@/video/state/logic/controls";
import { useMeta } from "@/video/state/logic/meta";
import { useSource } from "@/video/state/logic/source";

import { PopoutListEntry } from "./PopoutUtils";

const qualityMap: Record<string, MWStreamQuality> = {
  "360": MWStreamQuality.Q360P,
  "540": MWStreamQuality.Q540P,
  "480": MWStreamQuality.Q480P,
  "720": MWStreamQuality.Q720P,
  "1080": MWStreamQuality.Q1080P,
};

export function QualitySelectionPopout(props: {
  router: ReturnType<typeof useFloatingRouter>;
  prefix: string;
}) {
  const { t } = useTranslation();

  const descriptor = useVideoPlayerDescriptor();
  const { source } = useSource(descriptor);

  const controls = useControls(descriptor);
  const meta = useMeta(descriptor);
  const providerRef = useRef<string | null>(null);

  const provider = useMemo(
    () =>
      meta ? getProviders().find((v) => v.id === source?.providerId) : null,
    [meta, source]
  );

  const [scrapeResult, setScrapeResult] =
    useState<MWProviderScrapeResult | null>(null);

  const [runScraper] = useLoading(
    async (mwProvider: MWProvider | null | undefined) => {
      if (mwProvider && meta) {
        return runProvider(mwProvider, {
          media: meta.meta,
          progress: () => {},
          type: meta.meta.meta.type,
          episode: meta.episode?.episodeId as any,
          season: meta.episode?.seasonId as any,
        });
      }
    }
  );

  useEffect(() => {
    let isMounted = true;
    runScraper(provider).then(async (v) => {
      if (isMounted) setScrapeResult(v ?? null);
    });
    return () => {
      isMounted = false;
    };
  }, [provider, runScraper, scrapeResult]);

  function selectSource(stream: MWStream) {
    controls.setSource({
      quality: stream.quality,
      source: stream.streamUrl,
      type: stream.type,
      embedId: stream.embedId,
      providerId: providerRef.current ?? undefined,
      sources: stream.sources,
    });
    if (meta) {
      controls.setMeta({
        ...meta,
        captions: stream.captions,
      });
    }
    controls.closePopout();
  }

  const selectQuality = (url: string, quality: string) => {
    if (source)
      selectSource({
        quality: qualityMap[quality.toLowerCase().replace("p", "")],
        streamUrl: url,
        type: source?.type,
        embedId: source?.embedId,
        providerId: providerRef.current ?? undefined,
        sources: source?.sources,
        captions: [],
      });
  };

  return (
    <FloatingView
      {...props.router.pageProps(props.prefix)}
      width={320}
      height={500}
    >
      <FloatingCardView.Header
        title="Quality"
        description="What quality do you want to use?"
        goBack={() => props.router.navigate("/")}
      />
      <FloatingCardView.Content>
        {source?.sources?.map((v) => (
          <PopoutListEntry
            key={v.quality}
            active={v.quality === source?.quality}
            onClick={() => {
              selectQuality(v.url, v.quality);
            }}
          >
            {v.quality}
          </PopoutListEntry>
        ))}
      </FloatingCardView.Content>
    </FloatingView>
  );
}
