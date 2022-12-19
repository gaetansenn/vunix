import plugin from 'tailwindcss/plugin'

const coreDistPath = require.resolve('@vunix/core').replace('index.ts.mjs', '')

export default plugin(() => {}, {
    content: [
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        coreDistPath.replace('index.ts.mjs', '').replace('dist/', 'dist/runtime/components/**/*.{ts,mjs}'),
        coreDistPath.replace('index.ts.mjs', '').replace('dist/', 'dist/runtime/presets/**/*.{ts,mjs}')
    ],
})