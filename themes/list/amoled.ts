import gray from "./gray";
import { createTheme } from "../types";

const tokens = {
  black: "#000000",
  purple: {
    c50: "#aaafff",
    c100: "#8288fe",
    c200: "#5a62eb",
    c300: "#454cd4",
    c400: "#333abe",
    c500: "#292d86",
    c600: "#1f2363",
    c700: "#191b4a",
    c800: "#111334",
    c900: "#0b0d22"
  },
  shade: {
    c50: "#7c7c7c",
    c100: "#666666",
    c200: "#4f4f4f",
    c300: "#404040",
    c400: "#343434",
    c500: "#282828",
    c600: "#202020",
    c700: "#1a1a1a",
    c800: "#151515",
    c900: "#0e0e0e"
  },
  ash: {
    c50: "#8d8d8d",
    c100: "#6b6b6b",
    c200: "#545454",
    c300: "#3c3c3c",
    c400: "#313131",
    c500: "#2c2c2c",
    c600: "#252525",
    c700: "#1e1e1e",
    c800: "#181818",
    c900: "#111111"
  },
  blue: {
    c50: "#ccccd6",
    c100: "#a2a2a2",
    c200: "#868686",
    c300: "#646464",
    c400: "#4e4e4e",
    c500: "#383838",
    c600: "#2e2e2e",
    c700: "#272727",
    c800: "#181818",
    c900: "#0f0f0f"
  }
}

export default createTheme({
  name: "amoled",
  extend: {
    colors: {
      ...gray.extend.colors,
      pill: {
        ...gray.extend.colors.pill,
        background: tokens.black,
        backgroundHover: tokens.shade.c700,
        highlight: tokens.blue.c200,
      },

      background: {
        ...gray.extend.colors.background,
        main: tokens.black,
        secondary: tokens.black,
        secondaryHover: tokens.black,
        accentA: tokens.black,
        accentB: tokens.black,
      },

      lightBar: {
        light: tokens.black,
      },

      search: {
        ...gray.extend.colors.search,
        background: tokens.shade.c800,
        hoverBackground: tokens.shade.c900,
        focused: tokens.shade.c700,
        placeholder: tokens.shade.c200,
        icon: tokens.shade.c500,
      },

      mediaCard: {
        ...gray.extend.colors.mediaCard,
        hoverBackground: tokens.shade.c900,
        hoverShadow: tokens.black,
        shadow: tokens.shade.c800,
      },

      dropdown: {
        ...gray.extend.colors.dropdown,
        background: tokens.shade.c800,
        altBackground: tokens.black,
        hoverBackground: tokens.shade.c700,
        contentBackground: tokens.black
      },

      settings: {
        ...gray.extend.colors.settings,

        sidebar: {
          ...gray.extend.colors.settings.sidebar,
          activeLink: tokens.shade.c900
        },

        card: {
          border: tokens.shade.c700,
          background: tokens.shade.c700,
          altBackground: tokens.shade.c700,
        },
        
        saveBar: {
          background: tokens.black,
        },
      },

      errors: {
        ...gray.extend.colors.errors,
        card: tokens.black,
      },

      video: {
        ...gray.extend.colors.video,

        scraping: {
          card: tokens.black,
          loading: tokens.purple.c200,
          noresult: tokens.ash.c100
        },

        context: {
          ...gray.extend.colors.video.context,
          background: tokens.black,
        }
      },
    },
  }
});
