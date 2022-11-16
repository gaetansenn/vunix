import { defineNuxtModule, installModule } from '@nuxt/kit';



// -- Unbuild CommonJS Shims --
import __cjs_url__ from 'url';
import __cjs_path__ from 'path';
import __cjs_mod__ from 'module';
const __filename = __cjs_url__.fileURLToPath(import.meta.url);
const __dirname = __cjs_path__.dirname(__filename);
const require = __cjs_mod__.createRequire(import.meta.url);
const coreDistPath = require.resolve("@vunix/core").replace("/index.ts.mjs", "");
console.log("@vunix/nuxt: coredist path", coreDistPath);
const module = defineNuxtModule({
  meta: {
    name: "@vunix/nuxt",
    configKey: "@vunix/nuxt",
    compatibility: {
      nuxt: ">=3.0.0-rc.11"
    }
  },
  hooks: {
    "components:dirs": (dirs) => {
      dirs.push({
        path: coreDistPath.replace("dist", "dist/runtime/components"),
        ignore: ["index*"],
        global: true,
        prefix: "Dw",
        pathPrefix: false
      });
    },
    "build:before": (nuxt, buildOptions) => {
      buildOptions.transpile.push("@heroicons/vue");
    }
  },
  setup(moduleOptions, nuxt) {
    nuxt.options.app.head.link?.push({
      rel: "stylesheet",
      href: "https://rsms.me/inter/inter.css"
    });
    nuxt.hook("tailwindcss:config", function(config) {
      config.theme.extend.fontFamily = {
        sans: ["Inter var", require("tailwindcss/defaultTheme").fontFamily.sans]
      };
      config.content.push(coreDistPath.replace("dist", "dist/runtime/components/**/*.{vue,js,ts}"));
      config.content.push(coreDistPath.replace("dist", "dist/runtime/utils/config.{ts,mjs}"));
    });
    installModule("@nuxtjs/tailwindcss");
  }
});

export { module as default };
