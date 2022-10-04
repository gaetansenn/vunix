/** @type {import('tailwindcss').Config} */

const coreDistPath = require.resolve('ui-core').replace('index.ts.mjs', '')


module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    coreDistPath.replace('dist', 'dist/runtime/components/**/*.{vue,js,ts}'),
    coreDistPath.replace('dist', 'dist/runtime/utils/config.ts')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
