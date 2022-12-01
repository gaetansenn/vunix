'use strict';

const plugin = require('tailwindcss/plugin');

const coreDistPath = require.resolve("@vunix/core").replace("index.ts.mjs", "");
const index = plugin(() => {
}, {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    coreDistPath.replace("index.ts.mjs", "").replace("dist/", "dist/runtime/components/**/*.{ts,mjs}"),
    coreDistPath.replace("index.ts.mjs", "").replace("dist/", "dist/runtime/utils/config.{ts,mjs}")
  ]
});

module.exports = index;
