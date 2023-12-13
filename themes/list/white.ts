import { createTheme } from "../types";

const tokens = {
  shade: {
    c50: "#756790",
    c100: "#60527a",
    c200: "#4a3f60",
    c300: "#3c324f",
    c400: "#302741",
    c500: "#251e32",
    c600: "#1d1728",
    c700: "#181322",
    c800: "#130f1b",
    c900: "#0d0a12",
    c950: "#e0e0e0",
  },
  ash: {
    c50: "#7f859b",
    c100: "#5b627b",
    c200: "#444b64",
    c300: "#2b344e",
    c400: "#202842",
    c500: "#1c243c",
    c600: "#171d32",
    c700: "#131829",
    c800: "#101420",
    c900: "#0c0f16",
  },
  blue: {
    c50: "#adb4f5",
    c100: "#7981cc",
    c200: "#5d65ae",
    c300: "#3b438c",
    c400: "#2a3171",
    c500: "#1f2450",
    c600: "#1b1f41",
    c700: "#171b36",
    c800: "#101120",
    c900: "#0b0c13",
  },
  yellowDark: {
    c50: "#ffff00",
    c100: "#ffea00",
    c200: "#ffd500",
    c300: "#ffc100",
    c400: "#ffb000",
    c500: "#ff9e00",
    c600: "#ff8b00",
    c700: "#ff7700",
    c800: "#ff5d00",
    c900: "#ff3c00",
  },
};

export default createTheme({
  name: "white",
  extend: {
    colors: {
      themePreview: {
        primary: tokens.yellowDark.c200,
        secondary: tokens.shade.c50,
      },

      pill: {
        background: tokens.shade.c300,
        backgroundHover: tokens.shade.c200,
        highlight: tokens.yellowDark.c500,
      },

      global: {
        accentA: tokens.yellowDark.c200,
        accentB: tokens.yellowDark.c300,
      },

      lightBar: {
        light: tokens.yellowDark.c400,
      },

      buttons: {
        toggle: tokens.yellowDark.c300,
        toggleDisabled: tokens.ash.c500,

        secondary: tokens.ash.c700,
        secondaryHover: tokens.ash.c700,
        purple: tokens.yellowDark.c500,
        purpleHover: tokens.yellowDark.c400,
        cancel: tokens.ash.c500,
        cancelHover: tokens.ash.c300,
      },

      background: {
        main: "#ffffff",
        secondary: tokens.shade.c600,
        secondaryHover: tokens.shade.c400,
        accentA: tokens.yellowDark.c500,
        accentB: tokens.yellowDark.c500,
      },

      type: {
        logo: tokens.yellowDark.c100,
        text: tokens.shade.c50,
        dimmed: tokens.shade.c50,
        divider: tokens.ash.c500,
        secondary: tokens.ash.c100,
        link: tokens.yellowDark.c100,
        linkHover: tokens.yellowDark.c50,
      },

      search: {
        background: tokens.shade.c950,
        focused: tokens.shade.c400,
        placeholder: tokens.shade.c100,
        icon: tokens.shade.c100,
      },

      mediaCard: {
        hoverBackground: tokens.shade.c600,
        hoverAccent: tokens.shade.c50,
        hoverShadow: tokens.shade.c900,
        shadow: tokens.shade.c700,
        barColor: tokens.ash.c200,
        barFillColor: tokens.yellowDark.c100,
        badge: tokens.shade.c700,
        badgeText: tokens.ash.c100,
      },

      largeCard: {
        background: tokens.shade.c950,
        icon: tokens.yellowDark.c400,
      },

      dropdown: {
        background: tokens.shade.c600,
        altBackground: tokens.shade.c500,
        hoverBackground: tokens.shade.c500,
        text: tokens.ash.c50,
        secondary: tokens.shade.c100,
        border: tokens.shade.c400,
        contentBackground: tokens.shade.c500,
      },

      authentication: {
        border: tokens.shade.c300,
        inputBg: tokens.shade.c600,
        inputBgHover: tokens.shade.c500,
        wordBackground: tokens.shade.c500,
        copyText: tokens.shade.c100,
        copyTextHover: tokens.ash.c50,
      },

      settings: {
        sidebar: {
          activeLink: tokens.shade.c600,
          badge: tokens.shade.c900,

          type: {
            secondary: tokens.shade.c200,
            inactive: tokens.shade.c50,
            icon: tokens.shade.c950,
            iconActivated: tokens.yellowDark.c500,
            activated: tokens.shade.c50,
          },
        },

        card: {
          border: tokens.yellowDark.c400,
          background: tokens.shade.c400,
          altBackground: tokens.shade.c400,
        },

        saveBar: {
          background: tokens.shade.c800,
        },
      },

      utils: {
        divider: tokens.ash.c300,
      },

      errors: {
        card: tokens.shade.c800,
        border: tokens.ash.c500,

        type: {
          secondary: tokens.ash.c100,
        },
      },

      about: {
        circle: tokens.ash.c500,
        circleText: tokens.ash.c50,
      },

      editBadge: {
        bg: tokens.ash.c500,
        bgHover: tokens.ash.c400,
        text: tokens.ash.c50,
      },

      progress: {
        background: tokens.ash.c50,
        preloaded: tokens.ash.c50,
        filled: tokens.yellowDark.c200,
      },

      video: {
        buttonBackground: tokens.ash.c200,

        autoPlay: {
          background: tokens.ash.c700,
          hover: tokens.ash.c500,
        },

        scraping: {
          card: tokens.shade.c700,
          loading: tokens.yellowDark.c200,
          noresult: tokens.ash.c100,
        },

        audio: {
          set: tokens.yellowDark.c200,
        },

        context: {
          background: tokens.ash.c900,
          light: tokens.shade.c50,
          border: tokens.ash.c600,
          hoverColor: tokens.ash.c600,
          buttonFocus: tokens.ash.c500,
          flagBg: tokens.ash.c500,
          inputBg: tokens.ash.c600,
          buttonOverInputHover: tokens.ash.c500,
          inputPlaceholder: tokens.ash.c200,
          cardBorder: tokens.ash.c700,
          slider: tokens.ash.c50,
          sliderFilled: tokens.yellowDark.c200,

          buttons: {
            list: tokens.ash.c700,
            active: tokens.ash.c900,
          },

          closeHover: tokens.ash.c800,

          type: {
            secondary: tokens.ash.c200,
            accent: tokens.yellowDark.c200,
          },
        },
      },
    },
  },
});
