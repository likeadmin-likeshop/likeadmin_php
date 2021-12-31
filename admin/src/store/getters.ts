import { GetterTree } from 'vuex'
import { rootState } from './modules'

const getters: GetterTree<rootState, any> = {
	token: (state) => state.user.token,
    userInfo: (state) => state.user.user,
    config: (state) => state.app.config,
}


export default getters