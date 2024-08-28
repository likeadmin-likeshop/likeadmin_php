import './permission'
import './styles/index.scss'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'

import App from './App.vue'
import config from './config'
import install from './install'

const app = createApp(App)
app.use(install)
app.mount('#app')

const likeadminArt = `
  _       _   _   _   ______     ____     ______    __     __   _   __    _
 | |     | | | | / / |  ____|   / __ \\   |  ___  \\ |  \\   /  | | | |  \\  | |  
 | |     | | | |/ /  | |____   / /  \\ \\  | |   | | |   \\_/   | | | |   \\ | |  
 | |     | | |   |   |  ____| | |____| | | |   | | | |\\   /| | | | | |\\ \\| |
 | |___  | | | |\\ \\  | |____  |  ____  | | |___/ / | | | | | | | | | | \\   |
 |_____| |_| |_| \\_\\ |______| |_|    |_| |______/  |_| |_| |_| |_| |_|  \\__|
`

console.log(
    `%cLikeadmin-PHP v${config.version}`,
    'background: #4A5DFF; color: white; font-size: 10px; padding: 4px 8px; border-radius: 4px;'
)
console.log(`%c ${likeadminArt}`, 'color: #4A5DFF')
