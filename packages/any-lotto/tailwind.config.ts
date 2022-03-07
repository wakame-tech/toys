import { defineConfig } from "windicss/helpers";

const range = (size: number, startAt = 1) => {
  return Array.from(Array(size).keys()).map((i) => i + startAt);
};

export default defineConfig({
  darkMode: "media",
  safelist: [range(10).map((i) => `opacity-${i * 10}`)],
});
