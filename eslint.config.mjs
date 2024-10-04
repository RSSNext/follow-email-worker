// @ts-check
import { defineConfig } from "eslint-config-hyoban"

export default defineConfig(
  {
    formatting: {
      quotes: "double",
      arrowParens: true,
      braceStyle: "1tbs",
      semi: false,
      indent: 2,
      lineBreak: "after",
    },
    lessOpinionated: true,
  },
)
