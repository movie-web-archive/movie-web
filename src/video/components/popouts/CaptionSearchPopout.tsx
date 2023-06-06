import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { proxiedFetch } from "@/backend/helpers/fetch";
import { IconPatch } from "@/components/buttons/IconPatch";
import { Icons } from "@/components/Icon";
import { Loading } from "@/components/layout/Loading";
import { FloatingCardView } from "@/components/popout/FloatingCard";
import { FloatingView } from "@/components/popout/FloatingView";
import { useFloatingRouter } from "@/hooks/useFloatingRouter";
import { useLoading } from "@/hooks/useLoading";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { useMeta } from "@/video/state/logic/meta";

import { PopoutListAction, PopoutSection } from "./PopoutUtils";

interface JustChillSearchResult {
  path: string;
  title: string;
}

interface JustChillSearchResults {
  data: JustChillSearchResult[];
}

type JustChillCaptionResults = {
  data: {
    [key: string]: Array<{
      path: string;
      title: string;
      lang: string;
    }>;
  };
};

export type ParsedCaptionLanguages = {
  name: string;
  captions: {
    path: string;
    title: string;
  }[];
}[];

export function CaptionSearchPopout(props: {
  router: ReturnType<typeof useFloatingRouter>;
  prefix: string;
  setCaptionLanguages: (captionLanguages: ParsedCaptionLanguages) => void;
  captionLanguages: ParsedCaptionLanguages | null;
  setCurrentLanguage: (currentLanguage: string) => void;
}) {
  const { t } = useTranslation();

  const descriptor = useVideoPlayerDescriptor();
  const meta = useMeta(descriptor);

  const [getSubtitles, loading, error] = useLoading(async () => {
    const { data: titles }: JustChillSearchResults = await proxiedFetch(
      `https://www.justchill.tv/api/subsence/search?query=${encodeURIComponent(
        meta?.meta.meta.title as string
      )}`
    );

    let bestTitle = titles.find(
      ({ title }) =>
        title.includes(meta?.meta.meta.title as string) &&
        title.endsWith(`(${meta?.meta.meta.year})`)
    );

    if (!bestTitle) {
      bestTitle = titles[0];
    }

    const { data: languages }: JustChillCaptionResults = await proxiedFetch(
      `https://www.justchill.tv/api/subsence/subtitles?url=${bestTitle.path}`
    );

    const parsedLanguages: ParsedCaptionLanguages = [];

    for (const language in languages) {
      if (Object.hasOwn(languages, language)) {
        parsedLanguages.push({
          name: languages[language][0].lang,
          captions: languages[language].map((caption) => ({
            path: caption.path,
            title: caption.title,
          })),
        });
      }
    }

    props.setCaptionLanguages(parsedLanguages);
  });

  useEffect(() => {
    getSubtitles();
  }, [getSubtitles]);

  return (
    <FloatingView
      {...props.router.pageProps(props.prefix)}
      width={320}
      height={500}
    >
      <FloatingCardView.Header
        title="Captions search"
        description={t("videoPlayer.popouts.descriptions.captions")}
        goBack={() => props.router.navigate("/captions")}
      />
      <FloatingCardView.Content noSection>
        <PopoutSection>
          {loading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loading />
            </div>
          ) : error ? (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex flex-col flex-wrap items-center text-slate-400">
                <IconPatch
                  icon={Icons.EYE_SLASH}
                  className="text-xl text-bink-600"
                />
                <p className="mt-6 w-full text-center">Something went wrong</p>
              </div>
            </div>
          ) : (
            <div>
              {props.captionLanguages
                ? props.captionLanguages.map((captionLanguage) => (
                    <PopoutListAction
                      onClick={() => {
                        props.setCurrentLanguage(captionLanguage.name);
                        props.router.navigate("detailed-caption-search");
                      }}
                    >
                      {captionLanguage.name}
                    </PopoutListAction>
                  ))
                : null}
            </div>
          )}
        </PopoutSection>
      </FloatingCardView.Content>
    </FloatingView>
  );
}
