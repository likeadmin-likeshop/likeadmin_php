import app, { AppModule } from './app'
import permission, { PermissionModule } from './permission'
import user, { UserModule } from './user'
export interface rootState {
    app: AppModule
    permission: PermissionModule
    user: UserModule
}

export default {
    app,
    permission,
    user
}
