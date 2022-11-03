// Verificar session o jsonwebtoken
const Default = {
    state: () => ({  
        isAuthenticated: false
    }),
    getters: {
        getIsAuthenticated (state) {
            return state.isAuthenticated
        }
    },
    mutations: {
        setToggleAuthenticated(state) {
            state.isAuthenticated = !state.isAuthenticated
        },
        setAuthenticateTrue(state){
            state.isAuthenticated = true
        },
        setAuthenticateFalse(state){
            state.isAuthenticated = false
        }
    }
}

export default Default