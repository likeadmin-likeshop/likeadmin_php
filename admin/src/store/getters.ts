import { GetterTree } from 'vuex'
import { rootState } from './modules'

const getters: GetterTree<rootState, any> = {
    // token
    token: state => state.user.token,
    // 管理员信息
    userInfo: state => state.user.user,
    // 通用配置
    config: state => state.app.config,
    // 权限列表
    permissions: state => state.user.permissions,
    sidebar: state => state.user.sidebar
}

export default getters
