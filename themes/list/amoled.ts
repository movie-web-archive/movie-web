import { defaultTheme } from "../default";
import { createTheme } from "../types";

const tokens = {
  black: "#000000",
  blue: {
    c50: "#ADADF5",
    c100: "#7979CC",
    c200: "#5D5DAE",
    c300: "#3B3B8C",
    c400: "#2A2A71",
    c500: "#1F1F50",
    c600: "#1B1B41",
    c700: "#171736",
    c800: "#101020",
    c900: "#0B0B13",
  },
}

export default createTheme({
  name: "amoled",
  extend: {
    colors: {
      ...defaultTheme.extend.colors,
      background: {
        ...defaultTheme.extend.colors.background,
        main: tokens.black,
        secondary: tokens.black,
        secondaryHover: tokens.black,
      },
      lightBar: {
        light: tokens.blue.c800,
      },
      settings: {
        ...defaultTheme.extend.colors.settings,
        saveBar: {
          background: tokens.black,
        },
      },
    },
  }
});
