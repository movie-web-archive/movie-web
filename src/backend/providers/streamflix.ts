import { proxiedFetch } from "../helpers/fetch";
import { registerProvider } from "../helpers/register";
import {
  MWCaption,
  MWCaptionType,
  MWStreamQuality,
  MWStreamType,
} from "../helpers/streams";
import { MWMediaType } from "../metadata/types";

interface StreamFlixSourceData {
  headers: {
    Referer: string;
  };
  sources: {
    isM3U8: boolean;
    quality: string;
    url: string;
  }[];
  subtitles: {
    lang: string;
    url: string;
  }[];
}

const qualityMap: Record<string, MWStreamQuality> = {
  // eslint-disable-next-line prettier/prettier
  "auto": MWStreamQuality.QUNKNOWN,
  "360p": MWStreamQuality.Q360P,
  "480p": MWStreamQuality.Q480P,
  "720p": MWStreamQuality.Q720P,
  "1080p": MWStreamQuality.Q1080P,
};

function getCaptionTypeFromExtension(extension: string): MWCaptionType {
  const captionTypeKeys = Object.keys(MWCaptionType).filter((key) =>
    Number.isNaN(Number(key))
  );

  for (const key of captionTypeKeys) {
    if (extension === key.toLowerCase()) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return MWCaptionType[key];
    }
  }

  return MWCaptionType.UNKNOWN;
}

function parseSCaptions(
  subtitles: { lang: string; url: string }[]
): MWCaption[] {
  const parsedSubtitles: MWCaption[] = [];

  for (const subtitle of subtitles) {
    const { lang, url } = subtitle;
    const extension = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
    const type = getCaptionTypeFromExtension(extension);

    const caption: MWCaption = {
      url,
      type,
      langIso: lang,
    };

    parsedSubtitles.push(caption);
  }

  return parsedSubtitles;
}

const streamflixBase =
  "https://us-west2-compute-proxied.streamflix.one/api/player/";

registerProvider({
  id: "streamflix",
  displayName: "Streamflix",
  rank: 125,
  type: [MWMediaType.MOVIE, MWMediaType.SERIES],
  async scrape({ media, episode, progress }) {
    let requestUrl = "";

    const mediaId = media.imdbId ?? media.tmdbId;

    if (!mediaId) throw new Error("Not enough metadata");

    if (media.meta.type === MWMediaType.MOVIE) {
      requestUrl = `movie?id=${mediaId}`;
    }

    if (media.meta.type === MWMediaType.SERIES) {
      const seasonNumber = media.meta.seasonData.number;

      const episodeNumber = media.meta.seasonData.episodes.find(
        (e) => e.id === episode
      )?.number;
      if (!seasonNumber || !episodeNumber)
        throw new Error("Item does not exist");

      requestUrl = `tv?id=${mediaId}&s=${seasonNumber}&e=${episodeNumber}`;
    }

    const result = await proxiedFetch<StreamFlixSourceData>(requestUrl, {
      baseURL: streamflixBase,
    });

    if (!result) throw new Error("Item does not exist");

    progress(50);

    const quality = result.sources.reduce(
      (prev, curr) => {
        if (qualityMap[curr.quality] > qualityMap[prev.quality]) {
          return curr;
        }
        return prev;
      },
      { quality: "auto" }
    );

    const streamUrl = result.sources.find(
      (v) => v.quality === quality.quality
    )?.url;

    if (!streamUrl) throw new Error("No watchable item found");

    progress(100);

    return {
      embeds: [],
      stream: {
        streamUrl,
        quality: qualityMap[quality.quality],
        type: result.sources.find((v) => v.quality === quality.quality)?.isM3U8
          ? MWStreamType.HLS
          : MWStreamType.MP4,
        captions: parseSCaptions(result.subtitles),
      },
    };
  },
});
