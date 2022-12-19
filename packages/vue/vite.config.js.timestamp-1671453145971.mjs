// vite.config.js
import vue from "file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import { defineConfig } from "file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/vite/dist/node/index.js";
import { URL, fileURLToPath } from "url";
import dts from "file:///Users/gaetansenn/Development/dewib/librairies/ui/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/gaetansenn/Development/dewib/librairies/ui/packages/vue";
var __vite_injected_original_import_meta_url = "file:///Users/gaetansenn/Development/dewib/librairies/ui/packages/vue/vite.config.js";
var vite_config_default = defineConfig({
  build: {
    target: "esnext",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "@vunix/vue",
      fileName: "vunix-vue"
    },
    rollupOptions: {
      external: ["vue", "lodash"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  plugins: [vue(), dts({
    outputDir: "dist/types",
    insertTypesEntry: true
  })],
  resolve: {
    alias: {
      "@/": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZ2FldGFuc2Vubi9EZXZlbG9wbWVudC9kZXdpYi9saWJyYWlyaWVzL3VpL3BhY2thZ2VzL3Z1ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2dhZXRhbnNlbm4vRGV2ZWxvcG1lbnQvZGV3aWIvbGlicmFpcmllcy91aS9wYWNrYWdlcy92dWUvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2dhZXRhbnNlbm4vRGV2ZWxvcG1lbnQvZGV3aWIvbGlicmFpcmllcy91aS9wYWNrYWdlcy92dWUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IFVSTCwgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCdcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgIG5hbWU6ICdAdnVuaXgvdnVlJyxcbiAgICAgIGZpbGVOYW1lOiAndnVuaXgtdnVlJyxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vIG1ha2Ugc3VyZSB0byBleHRlcm5hbGl6ZSBkZXBzIHRoYXQgc2hvdWxkbid0IGJlIGJ1bmRsZWRcbiAgICAgIC8vIGludG8geW91ciBsaWJyYXJ5XG4gICAgICBleHRlcm5hbDogWyd2dWUnLCAnbG9kYXNoJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgLy8gUHJvdmlkZSBnbG9iYWwgdmFyaWFibGVzIHRvIHVzZSBpbiB0aGUgVU1EIGJ1aWxkXG4gICAgICAgIC8vIGZvciBleHRlcm5hbGl6ZWQgZGVwc1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgdnVlOiAnVnVlJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW3Z1ZSgpLCAgZHRzKHtcbiAgICBvdXRwdXREaXI6ICdkaXN0L3R5cGVzJyxcbiAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLFxuICB9KV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AvJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VyxPQUFPLFNBQVM7QUFDNVgsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsS0FBSyxxQkFBcUI7QUFDbkMsT0FBTyxTQUFTO0FBSmhCLElBQU0sbUNBQW1DO0FBQTJMLElBQU0sMkNBQTJDO0FBTXJSLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUdiLFVBQVUsQ0FBQyxPQUFPLFFBQVE7QUFBQSxNQUMxQixRQUFRO0FBQUEsUUFHTixTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksR0FBSSxJQUFJO0FBQUEsSUFDcEIsV0FBVztBQUFBLElBQ1gsa0JBQWtCO0FBQUEsRUFDcEIsQ0FBQyxDQUFDO0FBQUEsRUFDRixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxNQUFNLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3ZEO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
