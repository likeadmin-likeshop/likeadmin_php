'use strict'

module.exports = {
    publicPath: '/admin/',
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
