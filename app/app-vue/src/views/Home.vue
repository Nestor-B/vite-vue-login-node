<template>
    <div>
        <h2 class="text-danger" @click="increment">Hola {{$store.getters.getStateCount}}</h2>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
        <router-link to="/chat">Chat</router-link>
        <button @click="cerrarSession">Cerrar Session</button>
    </div>
</template>

<script>
    import store from '../store'
    import { useRouter } from 'vue-router'

    export default {
        name: 'Home',
        setup() {
            const router = useRouter()
            const increment = () => {
                store.commit('increment')
            }

            const cerrarSession = () => {
                store.commit('setAuthenticateFalse')
                localStorage.removeItem('dataValues')
                router.push({name: 'login'})
            }

            return {
                increment, cerrarSession
            }
        }
    }
</script>