// backend/eslint.config.mjs

import js from "@eslint/js";
import globals from "globals";

export default [
  // 1. Apply recommended JavaScript rules provided by ESLint
  js.configs.recommended,

  // 2. Configure the environment specifically for Node.js
  {
    files: ["**/*.{js,mjs,cjs}"], // Target JavaScript files for this config
    languageOptions: {
      ecmaVersion: "latest", // Allows use of modern ECMAScript features
      sourceType: "commonjs", // Assumes you are using require() and module.exports
      globals: {
        ...globals.node, // Defines standard Node.js global variables like 'process', '__dirname', etc.
        // Add any other custom global variables your project uses here
        // Example: myCustomGlobal: 'readonly'
      },
    },
    rules: {
    },
  },
];