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
                prependData: '@use "@/styles/variables.scss" as *;',
            }
        }
    },
    lintOnSave: false
}
