import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { MWProvider } from "@/backend/helpers/provider";
import { getProviders } from "@/backend/helpers/register";
import { Icons } from "@/components/Icon";
import { useVideoPlayerDescriptor } from "@/video/state/hooks";
import { VideoSourceEvent, useSource } from "@/video/state/logic/source";

import { PopoutListAction } from "../../popouts/PopoutUtils";

interface Props {
  onClick?: () => any;
}

function getCurrentProviderName(
  source: VideoSourceEvent["source"],
  providers: MWProvider[]
) {
  const selectedProviderId = source?.providerId;
  const currentProvider = providers.find(
    (provider) => provider.id === selectedProviderId
  );
  return currentProvider ? currentProvider.displayName : null;
}

function useProviderName(
  source: VideoSourceEvent["source"],
  providers: MWProvider[]
) {
  const currentProviderName = useMemo(
    () => getCurrentProviderName(source, providers),
    [source, providers]
  );
  return currentProviderName;
}

function CurrentSource() {
  const descriptor = useVideoPlayerDescriptor();
  const source = useSource(descriptor);
  const providers = getProviders();
  const currentProviderName = useProviderName(source.source, providers);

  return (
    <div className="rounded-md bg-denim-300 px-2 py-1 transition-colors">
      <p className="text-center text-xs font-bold text-slate-300 transition-colors">
        {currentProviderName}
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
