# Vunix

This is an official Vunix repository

## What is Vunix

Vunix is an open source library that expose a bunch of components to easily integrate the design of your website.

The core is build on top of [Vue.js](https://vuejs.org) framework and [TailwindCSS](https://tailwindcss.com/) to easily customize your theme from a configuration file.

Vunix is also compatible with [Nuxt.js](http://nuxtjs.org)

- [📄 Documentation](https://vunix.dewib.com)

## What's inside?

This reposiroty uses [Yarn](https://classic.yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `docs`: a [Nuxt](https://nuxt.com) app with [Docus](https://docus.dev)
- `nuxt-example`: Another [Nuxt.js](http://nuxtjs.org) example of usage and installation
- `vue-example`: a [Vue.js](https://vuejs.org) example of usage and installation
- `vunix/core`: a stub Vue.js component library and used by all applications
- `vunix/vue`: a [Vue.js](https://nextjs.org) compatible module that bundle the core
- `vunix/nuxt`: a [Nuxt](http://nuxt.com) compatible module that bundle the core
- `vue-tailwind-plugin`: a [TailwindCSS](https://tailwindcss.com/) plugin to handle css optimisation classes exposition
- `vunix/rules`: a blundle of functions to handle validation such as (required, email, ...)

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
yarn install
yarn run build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn install
yarn run dev
```

## Release / Publish

https://github.com/changesets/changesets

## Partners

<a href="https://www.useradgents.com/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/partners/ua_white.svg">
    <source media="(prefers-color-scheme: light)" srcset="./assets/partners/ua_black.svg">
    <img alt="Useradgents" src="./assets/partners/ua_white.svg" width="200">
  </picture>
</a>
