import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { input: 'src/index.ts', ext: 'mjs' },
    { input: 'src/runtime/', outDir: 'dist/runtime', ext: 'mjs' },
  ],
  // Generates .d.ts declaration file
  declaration: true,
  externals: [
    'vue',
    'vue-router',
    'lodash',
    'lodash/get.js',
    'lodash/set.js'
  ],
  failOnWarn: false
})
