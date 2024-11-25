import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      pretendard: [
        "var(--font-pretendard)",
        "-apple-system",
        "BlinkMacSystemFont",
        "system-ui",
        "Roboto",
        "Helvetica\\ Neue",
        "Segoe\\ UI",
        "Apple\\ SD\\ Gothic\\ Neo",
        "Noto\\ Sans\\ KR",
        "Malgun\\ Gothic",
        "Apple\\ Color\\ Emoji",
        "Segoe\\ UI\\ Emoji",
        "Segoe\\ UI\\ Symbol",
        "sans-serif",
      ],
    },
    fontSize: {
      "4xl": ["40px", "48px"],
      "3xl": ["32px", "38px"],
      "2xl": ["24px", "28px"],
      xl: ["20px", "24px"],
      "2lg": ["18px", "21px"],
      lg: ["16px", "19px"],
      md: ["14px", "17px"],
      sm: ["13px", "16px"],
      xs: ["12px", "14px"],
    },
    extend: {
      screens: {
        tab: "744px",
        pc: "1200px",
      },
      colors: {
        gray: {
          "500": "#D9D9D9",
        },
        brand: {
          primary: {
            light: "#EDB372",
            dark: "#10B981",
          },
          secondary: {
            light: "#F5BE7E",
            dark: "#34D399",
          },
          tertiary: "#A3E635",
          gradient: {
            from: "#10B981",
            to: "#A3E635",
          },
          border: "#DEBD66",
          check: "#37FF73",
          active: "#FF810D",
          header: "#FFE2B9",
        },
        point: {
          purple: "#A855F7",
          blue: "#3B82F6",
          cyan: "#06B6D4",
          pink: "#EC4899",
          rose: "#F43F5E",
          orange: "#F97316",
          yellow: "#EAB308",
        },
        icon: {
          primary: "#64748B",
          inverse: "#F8FAFC",
          brand: "#10B981",
        },
        input: {
          default: "#EDEDED",
        },
        dropDown: {
          default: "#F3F3F3",
          border: "#E8E8E8",
          secondary: "#F9F9F9",
          beige: "#FED9B7",
        },
        button: {
          default: "#EDB372",
          hover: "#FFAE67",
          active: "#DC923E",
        },
        inactive: "#94A3B8",
        hover: "#059669",
        pressed: "#047857",
        focus: "#10B981",
        danger: "#DC2626",
      },
      backgroundColor: {
        primary: {
          light: "#F9F5EF",
          dark: "#0F172A",
        },
        secondary: "#1E293B",
        tertiary: "#334155",
        inverse: "#FFFFFF",
        landing: {
          from: "#0095E0",
          to: "#FED9B7",
        },
      },
      borderColor: {
        primary: "#F8FAFC80",
      },
      textColor: {
        primary: "#F8FAFC",
        secondary: {
          light: "#888888",
          dark: "#CBD5E1",
        },
        tertiary: "#E2E8F0",
        default: {
          light: "#222222",
          dark: "#64748B",
        },
        inverse: "#FFFFFF",
        disabled: "#94A3B8",
        subText: "#666666",
        placeHolder: "#64748B",
        link: {
          light: "#FF5E35",
          dark: "#10b981",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    ({ matchComponents, theme }: PluginAPI) => {
      const fontSizeKeys = Object.keys(theme("fontSize"));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const matchComponentsObject: any = {};

      fontSizeKeys.forEach((Key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        matchComponentsObject[Key] = (value: any) => ({
          fontSize: theme(`fontSize.${Key}[0]`),
          lineHeight: theme(`fontSize.${Key}[1]`),
          fontWeight: value,
        });
      });

      matchComponents(matchComponentsObject, {
        values: theme("fontWeight"),
      });
    },
  ],
};
export default config;
