import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    react.configs.flat.recommended,
    reactHooks.configs["recommended-latest"],
    sonarjs.configs.recommended,
    unicorn.configs.recommended,
  ],
  files: ["src/**/*.{js,jsx,ts,tsx}"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "sonarjs/todo-tag": "off",
    "unicorn/filename-case": "off",
    "unicorn/prefer-global-this": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        ignore: [/args/i, /env/i, /msg/i, /param/i, /props/i, /src/i, /utils/i],
      },
    ],
  },
});
