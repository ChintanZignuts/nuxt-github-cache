// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  nitro: {
    storage: {
      redis: {
        driver: "redis",
        port: 6379,
        host: "127.0.0.1",
      },
    },
  },
  devtools: { enabled: true },
});
