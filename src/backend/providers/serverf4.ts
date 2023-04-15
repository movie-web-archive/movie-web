import { registerProvider } from "@/backend/helpers/register";
import { MWMediaType } from "@/backend/metadata/types";
import { MWStreamQuality } from "@/backend/helpers/streams";
import { proxiedFetch } from "../helpers/fetch";

const BASE_URL = "https://api.123movie.cc";
const SERVER = "serverf4";

registerProvider({
  id: "serverf4",
  displayName: "serverf4",
  disabled: false,
  rank: 50,
  type: [MWMediaType.MOVIE],

  async scrape({ progress, media: { imdbId } }) {
    progress(10);

    const document = await proxiedFetch<any>(
      `/imdb.php/?${new URLSearchParams({
        imdb: imdbId,
        server: SERVER,
      })}`,
      {
        baseURL: BASE_URL,
        headers: {
          "X-Referer": BASE_URL,
        },
      }
    );

    const HTMLdoc = new DOMParser().parseFromString(document, "text/html");

    const iframeSrc = HTMLdoc.querySelector("iframe")?.src;

    if (!iframeSrc) throw new Error("No iframe found");

    const iframeDocument = await proxiedFetch<any>(
      iframeSrc,
      {
        headers: {
          "X-Referer": BASE_URL,
          "X-Disable-Redirect-Following": "true",
        },
      },
      true
    );

    // The X-Destination does not exist in the response and needs to be added to the proxy
    const id = iframeDocument.headers.get("location").split("/v/")[1];

    const videoInfo = await proxiedFetch<any>(
      `https://serverf4.org/api/source/${id}`,
      {
        method: "POST",
      }
    );

    const source = videoInfo.data[videoInfo.data.length - 1];

    if (!source) throw new Error("No source found");

    let quality;
    if (source.type === "720p") quality = MWStreamQuality.Q720P;
    else if (source.type === "480p") quality = MWStreamQuality.Q480P;
    else quality = MWStreamQuality.QUNKNOWN;

    return {
      stream: {
        streamUrl: source.file,
        type: source.type,
        quality,
        captions: videoInfo.captions,
      },
      embeds: [],
    };
  },
});

});
