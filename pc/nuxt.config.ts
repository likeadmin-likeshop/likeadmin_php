// https://v3.nuxtjs.org/api/configuration/nuxt.config

import { getEnvConfig } from './nuxt/env'
const envConfig = getEnvConfig()
export default defineNuxtConfig({
    css: ['@/assets/styles/index.scss'],
    modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
    runtimeConfig: {
        public: {
            ...envConfig
        },
        aa: {}
    }
})
