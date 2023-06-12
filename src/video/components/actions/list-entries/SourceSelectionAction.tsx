import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

import { Icons } from "@/components/Icon";

import { QualityDisplayAction } from "./QualityDisplayAction";
import { PopoutListAction } from "../../popouts/PopoutUtils";

interface Props {
  onClick?: () => any;
  onQuality?: (e: SyntheticEvent) => void;
}

export function SourceSelectionAction(props: Props) {
  const { t } = useTranslation();

  return (
    <PopoutListAction
      icon={Icons.CLAPPER_BOARD}
      onClick={props.onClick}
      right={<QualityDisplayAction onQuality={props.onQuality} />}
      noChevron
    >
      {t("videoPlayer.buttons.source")}
    </PopoutListAction>
  );
}
