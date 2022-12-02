export default defineAppConfig({
  docus: {
    title: 'Vunix',
    description: 'An open source ui library for developing HTML/CSS and JS websites on top of tailwind css and compatible with Vue 3 and Nuxt 3',
    image: '/social-card-preview.png',
    socials: {
      twitter: '@docus_',
      github: 'nuxt-themes/docus'
    },
    github: {
      root: 'content',
      edit: true,
      contributors: false
    },
    footer: {
      icons: [
        {
          label: 'NuxtJS',
          href: 'https://nuxtjs.org',
          icon: 'IconNuxtLabs'
        },
        {
          label: 'Vue Telescope',
          href: 'https://vuetelescope.com',
          icon: 'IconVueTelescope'
        }
      ]
    }
  }
})
