import { login } from "@/api/user";
import { setToken ,getToken,delToken } from "@/utils/storage";
export default ({
    namespaced: true,
    state: {
        token: getToken(),
    },
    getters: {
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        delToken(state) {
            state.token = '';
            delToken();
        }
    },
    actions: {
        async login(context, data) {
            const res = await login(data)
            context.commit('setToken', res.data.token)
        }
    },
    modules: {
    }
})