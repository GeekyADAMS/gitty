
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
 head: {
  title: 'GITTY | Github Analytics Website',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Adams Abdulhakeem (GeekyAdams) Web Portfolio' },
    {name: 'theme-color', content: '#9966FF'},
    {name: 'author', content: 'Adams Abdulhakeem'},
    {name: 'copyright', content: 'Adams Abdulhakeem'},
    {name: 'keywords', content: 'Search Github Users, Github analytics, Github statistics, Github Diary, Open source, Github Databank'},
    {name: 'twitter:Gitty (Github Data Bank)', content: 'Search and analyse from millions of Github user data.'},
    {'http-equiv': 'expires', content: '43200'}
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/icon.png' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap'},
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Satisfy&display=swap'},
    { rel: 'stylesheet', href: '//db.onlinewebfonts.com/c/480e3d39ed40d6543721946a2d36ccff?family=RZ'},
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Anonymous+Pro&display=swap'},
    { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap'},
    { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.rawgit.com/rikmms/progress-bar-4-axios/0a3acf92/dist/nprogress.css'},
    { rel: 'stylesheet', href: '/css/pace-theme-flash.css'},
    { rel: 'stylesheet', href: '/css/animate.css'}
  ],
  script: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.1/gsap.min.js' },
    { src: '/modules/pace.min.js', 'data-pace-options': { "ajax": false } },
    { src: 'https://cdn.rawgit.com/rikmms/progress-bar-4-axios/0a3acf92/dist/index.js' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/tilt.js/1.2.1/tilt.jquery.min.js', body: true },
    { type: 'text/javascript', src: '/modules/mouse-negative.js', body: true },
    { type: 'text/javascript', src: '/modules/custom.js', body: true },
  ]
},
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/global.css',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
