import './permission'
import './styles/index.scss'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'

import { getConfig } from './api/app'
import App from './App.vue'
import install from './install'

const app = createApp(App)
app.use(install)
app.mount('#app')

getConfig().then((res) => {
    const likeadminArt = `
  _       _   _   _   ______     ____     ______    __     __   _   __    _
 | |     | | | | / / |  ____|   / __ \\   |  ___  \\ |  \\   /  | | | |  \\  | |  
 | |     | | | |/ /  | |____   / /  \\ \\  | |   | | |   \\_/   | | | |   \\ | |  
 | |     | | |   |   |  ____| | |____| | | |   | | | |\\   /| | | | | |\\ \\| |
 | |___  | | | |\\ \\  | |____  |  ____  | | |___/ / | | | | | | | | | | \\   |
 |_____| |_| |_| \\_\\ |______| |_|    |_| |______/  |_| |_| |_| |_| |_|  \\__|
`

    console.log(
        `%c likeadmin %c v${res.version} `,
        'padding: 4px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #bbb; font-weight: bold;',
        'padding: 4px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #4A5DFF; font-weight: bold;'
    )
    console.log(`%c ${likeadminArt}`, 'color: #4A5DFF')
})
