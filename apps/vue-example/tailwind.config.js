/** @type {import('tailwindcss').Config} */

const coreDistPath = require.resolve('@vunix/core').replace('index.ts.mjs', '')

console.log(coreDistPath.replace('dist/', 'dist/components/**/*.{vue,js,ts}'))
console.log(coreDistPath.replace('dist/', 'dist/utils/config.ts'))

module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    coreDistPath.replace('dist/', 'dist/components/**/*.{vue,js,ts}'),
    coreDistPath.replace('dist/', 'dist/utils/config.{ts,mjs}')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
