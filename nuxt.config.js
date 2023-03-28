export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'BrainCloud',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favico.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style/style.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  router: {
    middleware: ['auth']
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_ADDRESS
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_ADDRESS
    }
  },

  auth: {
    strategies: {
      local: {
        token: {
          required: true,
          type: 'Bearer',
          property: 'token'
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: process.env.API_ADDRESS + '/login', method: 'POST' },
          logout: { url: process.env.API_ADDRESS + '/logout', method: 'GET' },
          user: { url: process.env.API_ADDRESS + '/me', method: 'GET', propertyName: false }
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      callback: '/home',
      home: '/',
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_ADDRESS,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: null
  }
}
