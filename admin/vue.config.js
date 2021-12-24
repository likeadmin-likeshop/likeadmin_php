'use strict'

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {},
        },
    },

    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/styles/variables.scss";`,
            }
        }
    },
}
