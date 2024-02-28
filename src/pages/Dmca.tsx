import { useTranslation } from "react-i18next";

import { Icon, Icons } from "@/components/Icon";
import { ThinContainer } from "@/components/layout/ThinContainer";
import { Heading1, Paragraph } from "@/components/utils/Text";
import { PageTitle } from "@/pages/parts/util/PageTitle";
import { conf } from "@/setup/config";

import { SubPageLayout } from "./layouts/SubPageLayout";

export function shouldHaveDmcaPage() {
  return !!conf().DMCA_EMAIL;
}

export function DmcaPage() {
  const { t } = useTranslation();

  return (
    <SubPageLayout>
      <PageTitle subpage k="global.pages.dmca" />
      <ThinContainer>
        <Heading1>{t("screens.dmca.title")}</Heading1>
        <Paragraph>
          Welcome to our DMCA contact page. We believe that respecting
          intellectual property rights is important. Unfortunately, since this
          site merely acts as a search engine and thus links to 3rd-party sites,
          we cannot guarantee that these rights are always protected. That is
          why you can contact us below with a takedown request. The request
          should include a description of the copyrighted material, your contact
          details and a statement of good faith belief. We are committed to
          resolving these matters promptly and appreciate your cooperation.
        </Paragraph>
        <Paragraph className="flex space-x-3 items-center">
          <Icon icon={Icons.MAIL} />
          <span>{conf().DMCA_EMAIL ?? ""}</span>
        </Paragraph>
      </ThinContainer>
    </SubPageLayout>
  );
}
