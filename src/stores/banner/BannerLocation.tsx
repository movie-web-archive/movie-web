import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Icon, Icons } from "@/components/Icon";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useBannerStore, useRegisterBanner } from "@/stores/banner";
import { getMobileAppLink } from "@/utils/mobileAppLink";

import { usePlayerStore } from "../player/store";

export function Banner(props: {
  children: React.ReactNode;
  type: "error" | "open_app";
  id: string;
}) {
  const [ref] = useRegisterBanner<HTMLDivElement>(props.id);
  const hideBanner = useBannerStore((s) => s.hideBanner);
  const styles = {
    error: "bg-[#C93957] text-white",
    open_app: "bg-[#4169E1] text-white", // blue
  };
  const icons = {
    error: Icons.CIRCLE_EXCLAMATION,
    open_app: Icons.OPEN_IN_APP,
  };

  return (
    <div ref={ref}>
      <div
        className={[
          styles[props.type],
          "flex items-center justify-center p-4",
        ].join(" ")}
      >
        <div className="flex items-center space-x-3">
          <Icon icon={icons[props.type]} />
          <div>{props.children}</div>
        </div>
        <span
          className="absolute right-4 hover:cursor-pointer cursor-pointer"
          onClick={() => hideBanner(props.id, true)}
        >
          <Icon icon={Icons.X} />
        </span>
      </div>
    </div>
  );
}

export function LinkedBanner(props: {
  href: string;
  type: "error" | "open_app";
  id: string;
  children: React.ReactNode;
}) {
  return (
    <a href={props.href} rel="noreferrer">
      <Banner type={props.type} id={props.id}>
        {props.children}
      </Banner>
    </a>
  );
}

export function BannerLocation(props: { location?: string }) {
  const { t } = useTranslation();
  const isOnline = useBannerStore((s) => s.isOnline);
  const setLocation = useBannerStore((s) => s.setLocation);
  const ignoredBannerIds = useBannerStore((s) => s.ignoredBannerIds);
  const currentLocation = useBannerStore((s) => s.location);
  const { hasMobileUserAgent } = useIsMobile();
  const meta = usePlayerStore((s) => s.meta);
  const [appLink, setAppLink] = useState("");

  useEffect(() => {
    console.log(meta);
    if (meta) {
      setAppLink(getMobileAppLink(meta));
    } else {
      setAppLink("");
    }
  }, [meta]);

  const loc = props.location ?? null;

  useEffect(() => {
    if (!loc) return;
    setLocation(loc);
    return () => {
      setLocation(null);
    };
  }, [setLocation, loc]);

  if (currentLocation !== loc) return null;

  return (
    <div>
      {!isOnline && !ignoredBannerIds.includes("offline") ? (
        <Banner id="offline" type="error">
          {t("navigation.banner.offline")}
        </Banner>
      ) : null}
      {hasMobileUserAgent && !ignoredBannerIds.includes("open_app") ? (
        <LinkedBanner
          id="open_app"
          type="open_app"
          href={meta ? appLink : "movieweb://home"}
        >
          {t("navigation.banner.mobile")}
        </LinkedBanner>
      ) : null}
    </div>
  );
}
