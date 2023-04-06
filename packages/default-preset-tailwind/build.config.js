import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: true,
  declaration: true,
  externals: [
    '@vunix/core',
  ],
  rollup: {
      emitCJS: true,
  },
})