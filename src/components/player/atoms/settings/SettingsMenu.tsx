import { useMemo } from "react";

import { Toggle } from "@/components/buttons/Toggle";
import { Icon, Icons } from "@/components/Icon";
import { useCaptions } from "@/components/player/hooks/useCaptions";
import { Menu } from "@/components/player/internals/ContextMenu";
import { getLanguageFromIETF } from "@/components/player/utils/language";
import { useOverlayRouter } from "@/hooks/useOverlayRouter";
import { usePlayerStore } from "@/stores/player/store";
import { qualityToString } from "@/stores/player/utils/qualities";
import { useSubtitleStore } from "@/stores/subtitles";
import { providers } from "@/utils/providers";

export function SettingsMenu({ id }: { id: string }) {
  const router = useOverlayRouter(id);
  const currentQuality = usePlayerStore((s) => s.currentQuality);
  const selectedCaptionLanguage = usePlayerStore(
    (s) => s.caption.selected?.language
  );
  const subtitlesEnabled = useSubtitleStore((s) => s.enabled);
  const currentSourceId = usePlayerStore((s) => s.sourceId);
  const sourceName = useMemo(() => {
    if (!currentSourceId) return "...";
    return providers.getMetadata(currentSourceId)?.name ?? "...";
  }, [currentSourceId]);
  const { toggleLastUsed } = useCaptions();

  const selectedLanguagePretty = selectedCaptionLanguage
    ? getLanguageFromIETF(selectedCaptionLanguage) ?? "unknown"
    : undefined;

  const source = usePlayerStore((s) => s.source);

  return (
    <Menu.Card>
      <Menu.SectionTitle>Video settings</Menu.SectionTitle>
      <Menu.Section>
        <Menu.ChevronLink
          onClick={() => router.navigate("/quality")}
          rightText={currentQuality ? qualityToString(currentQuality) : ""}
        >
          Quality
        </Menu.ChevronLink>
        <Menu.ChevronLink
          onClick={() => router.navigate("/source")}
          rightText={sourceName}
        >
          Video source
        </Menu.ChevronLink>
        <Menu.Link
          clickable
          onClick={() =>
            router.navigate(
              source?.type === "file" ? "/download" : "/download/unable"
            )
          }
          rightSide={<Icon className="text-xl" icon={Icons.DOWNLOAD} />}
          className={source?.type === "file" ? "opacity-100" : "opacity-50"}
        >
          Download
        </Menu.Link>
      </Menu.Section>

      <Menu.SectionTitle>Viewing Experience</Menu.SectionTitle>
      <Menu.Section>
        <Menu.Link
          rightSide={
            <Toggle
              enabled={subtitlesEnabled}
              onClick={() => toggleLastUsed().catch(() => {})}
            />
          }
        >
          Enable Captions
        </Menu.Link>
        <Menu.ChevronLink
          onClick={() => router.navigate("/captions")}
          rightText={selectedLanguagePretty}
        >
          Caption settings
        </Menu.ChevronLink>
        <Menu.ChevronLink onClick={() => router.navigate("/playback")}>
          Playback settings
        </Menu.ChevronLink>
      </Menu.Section>
    </Menu.Card>
  );
}