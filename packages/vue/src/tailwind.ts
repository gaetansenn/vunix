import plugin from 'tailwindcss/plugin'

const coreDistPath = require.resolve('@vunix/core').replace('index.ts.mjs', '')

export default plugin(() => {}, {
    content: [
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        coreDistPath.replace('dist/', 'dist/runtime/components/**/*.{ts,mjs}'),
        coreDistPath.replace('dist/', 'dist/runtime/utils/config.{ts,mjs}')
    ],
})