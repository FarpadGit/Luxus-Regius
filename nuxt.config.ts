// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Luxus Regius",
      htmlAttrs: {
        lang: "hu",
      },
    },
  },
  css: ["@@/assets/css/main.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  components: [
    {
      path: "~/components",
      pathPrefix: true,
    },
  ],
  build: {
    transpile: ["oh-vue-icons"],
  },
  modules: ["@nuxtjs/tailwindcss", "vue3-carousel-nuxt"],
  runtimeConfig: {
    loginPassword: "",
    tursoDatabaseUrl: "",
    tursoAuthToken: "",
  },
});
