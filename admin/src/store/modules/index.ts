import app, { AppModule } from './app'
import user, { UserModule } from './user'
export interface rootState {
    app: AppModule
    user: UserModule
}

export default {
    app,
    user
}
