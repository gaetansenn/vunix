import { NuxtModule } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtConfig {
    ["pinceau"]?: typeof import("pinceau/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["content"]?: typeof import("@nuxt/content").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["docus"]?: typeof import("/Users/gaetansenn/Development/dewib/librairies/ui/node_modules/@nuxt-themes/docus-edge/app/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
  }
  interface RuntimeConfig {
     app: {
        baseURL: string,

        buildAssetsDir: string,

        cdnURL: string,
    },

    content: {
        cacheVersion: number,

        cacheIntegrity: string,

        transformers: Array<string>,

        base: string,

        watch: {
             ws: {
                   port: number,

                   hostname: string,

                   showURL: boolean,
             },
        },

        sources: any,

        ignores: Array<string>,

        locales: Array<any>,

        defaultLocale: any,

        highlight: {
             theme: string,

             preload: Array<string>,

             apiURL: string,
        },

        markdown: {
             tags: {
                   p: string,

                   a: string,

                   blockquote: string,

                   "code-inline": string,

                   code: string,

                   em: string,

                   h1: string,

                   h2: string,

                   h3: string,

                   h4: string,

                   h5: string,

                   h6: string,

                   hr: string,

                   img: string,

                   ul: string,

                   ol: string,

                   li: string,

                   strong: string,

                   table: string,

                   thead: string,

                   tbody: string,

                   td: string,

                   th: string,

                   tr: string,
             },

             anchorLinks: {
                   depth: number,

                   exclude: Array<number>,
             },

             remarkPlugins: any,

             rehypePlugins: any,
        },

        yaml: any,

        csv: {
             delimeter: string,

             json: boolean,
        },

        navigation: {
             fields: Array<string>,
        },

        documentDriven: boolean,

        experimental: {
             clientDB: boolean,
        },
    },
  }
  interface PublicRuntimeConfig {
     content: {
        clientDB: {
             isSPA: boolean,

             integrity: number,
        },

        navigation: {
             fields: Array<string>,
        },

        base: string,

        tags: {
             p: string,

             a: string,

             blockquote: string,

             "code-inline": string,

             code: string,

             em: string,

             h1: string,

             h2: string,

             h3: string,

             h4: string,

             h5: string,

             h6: string,

             hr: string,

             img: string,

             ul: string,

             ol: string,

             li: string,

             strong: string,

             table: string,

             thead: string,

             tbody: string,

             td: string,

             th: string,

             tr: string,
        },

        highlight: {
             theme: string,

             preload: Array<string>,

             apiURL: string,
        },

        wsUrl: string,

        documentDriven: {
             page: boolean,

             navigation: boolean,

             surround: boolean,

             globals: any,

             layoutFallbacks: Array<string>,

             injectPage: boolean,
        },

        anchorLinks: {
             depth: number,

             exclude: Array<number>,
        },
    },
  }
}