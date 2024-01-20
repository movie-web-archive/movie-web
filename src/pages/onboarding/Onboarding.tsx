import classNames from "classnames";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/buttons/Button";
import { Stepper } from "@/components/layout/Stepper";
import { CenterContainer } from "@/components/layout/ThinContainer";
import { Modal, ModalCard, useModal } from "@/components/overlays/Modal";
import { Heading1, Heading2, Paragraph } from "@/components/utils/Text";
import { MinimalPageLayout } from "@/pages/layouts/MinimalPageLayout";
import { useRedirectBack } from "@/pages/onboarding/onboardingHooks";
import { Card, CardContent, Link } from "@/pages/onboarding/utils";
import { PageTitle } from "@/pages/parts/util/PageTitle";

function VerticalLine(props: { className?: string }) {
  return (
    <div className={classNames("w-full grid justify-center", props.className)}>
      <div className="w-px h-10 bg-onboarding-divider" />
    </div>
  );
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const skipModal = useModal("skip");
  const { completeAndRedirect } = useRedirectBack();
  const { t } = useTranslation();

  return (
    <MinimalPageLayout>
      <PageTitle subpage k="global.pages.onboarding" />
      <Modal id={skipModal.id}>
        <ModalCard>
          <ModalCard>
            <Heading1 className="!mt-0">
              {t("onboarding.defaultConfirm.title")}
            </Heading1>
            <Paragraph>{t("onboarding.defaultConfirm.description")}</Paragraph>
            <Button theme="secondary" onClick={skipModal.hide}>
              {t("onboarding.defaultConfirm.cancel")}
            </Button>
            <Button theme="danger" onClick={() => completeAndRedirect()}>
              {t("onboarding.defaultConfirm.confirm")}
            </Button>
          </ModalCard>
        </ModalCard>
      </Modal>
      <CenterContainer>
        <Stepper steps={2} current={1} className="mb-12" />
        <Heading2 className="!mt-0 !text-3xl max-w-[435px]">
          {t("onboarding.start.title")}
        </Heading2>
        <Paragraph className="max-w-[320px]">
          {t("onboarding.start.explainer")}
        </Paragraph>

        <div className="w-full grid grid-cols-[1fr,auto,1fr] gap-3">
          <Card onClick={() => navigate("/onboarding/proxy")}>
            <CardContent
              colorClass="!text-onboarding-good"
              title={t("onboarding.start.options.proxy.title")}
              subtitle={t("onboarding.start.options.proxy.quality")}
              description={t("onboarding.start.options.proxy.description")}
            >
              <Link>{t("onboarding.start.options.proxy.action")}</Link>
            </CardContent>
          </Card>
          <div className="grid grid-rows-[1fr,auto,1fr] justify-center gap-4">
            <VerticalLine className="items-end" />
            <span className="text-xs uppercase font-bold">or</span>
            <VerticalLine />
          </div>
          <Card onClick={() => navigate("/onboarding/extension")}>
            <CardContent
              colorClass="!text-onboarding-best"
              title={t("onboarding.start.options.extension.title")}
              subtitle={t("onboarding.start.options.extension.quality")}
              description={t("onboarding.start.options.extension.description")}
            >
              <Link>{t("onboarding.start.options.extension.action")}</Link>
            </CardContent>
          </Card>
        </div>

        <p className="text-center mt-12">
          <Trans i18nKey="onboarding.start.options.default.text">
            <br />
            <a
              onClick={skipModal.show}
              type="button"
              className="text-onboarding-link hover:opacity-75 cursor-pointer"
            />
          </Trans>
        </p>
      </CenterContainer>
    </MinimalPageLayout>
  );
}