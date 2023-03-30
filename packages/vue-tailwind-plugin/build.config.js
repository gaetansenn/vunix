import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
      'src/index',
  ],
  clean: true,
  declaration: false,
  externals: [
      'tailwindcss/plugin',
  ],
  rollup: {
      emitCJS: true,
      inlineDependencies: true,
  },
})