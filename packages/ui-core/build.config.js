import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  // If entries is not provided, will be automatically inferred from package.json
  entries: [
    'src/index.ts',
    { input: 'src/runtime/', outDir: 'dist/runtime', ext: 'mjs' },
    // { input: 'src/runtime/', outDir: 'dist/runtime', format: 'cjs', ext: 'cjs', declaration: false }
  ],
  // Generates .d.ts declaration file
  declaration: true,
  externals: [
    'vue',
    'vue-router',
    'lodash',
    // 'unctx'
  ],
  failOnWarn: false
})
