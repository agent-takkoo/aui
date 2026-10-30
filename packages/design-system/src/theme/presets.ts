import { defineTheme } from "./tokens.js";

const fontFamily =
  '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const defaultTheme = defineTheme({
  name: "default",
  brand: "indigo",
  neutral: "slate",
  radius: "medium",
  scaling: "100%",
  fontFamily,
});

export const creamTheme = defineTheme({
  name: "cream",
  brand: "ruby",
  neutral: "sand",
  radius: "small",
  scaling: "100%",
  fontFamily,
  typography: {
    display: { letterSpacing: "-0.01em", weight: 600 },
    title: { letterSpacing: "-0.005em", weight: 600 },
  },
});
