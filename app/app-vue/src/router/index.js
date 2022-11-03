import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import axios from 'axios'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', 
            name: 'home', 
            component: () => import('../views/Home.vue')
        },
        {
            path: '/chat', 
            name: 'chat', 
            component: () => import('../views/Chat.vue')
        },
        {
            path: '/login', 
            name: 'login', 
            component: () => import('../views/Login.vue')
        },
        {
            path: '/register', 
            name: 'register', 
            component: () => import('../views/Register.vue')
        }
    ]
})

const removeDataValues = () => {
    console.clear()
    localStorage.removeItem('dataValues')
    store.commit('setAuthenticateFalse')
    router.push({name: 'login'})    
}

const VerifyToken =  async () => {
    try {
        if( localStorage.getItem('dataValues') ){
            const dataValues = JSON.parse( localStorage.getItem('dataValues') )
            axios.post('/access/verify-token', {
                headers: {
                    'Authorization': `Bearer ${dataValues.token}`
                }
            }).then((response) => {
                if( response ){
                    let { data } = response.data
                    if( !data.active ){
                        alert('Cuenta Inactiva')
                        localStorage.removeItem('dataValues')
                        store.commit('setAuthenticateFalse')
                        router.push({name: 'login'})
                        return
                    }
                    
                    localStorage.setItem('dataValues', JSON.stringify(data))
                    store.commit('setAuthenticateTrue')
                }
            }).catch(() => removeDataValues())
        }        
    } catch (err) {
        removeDataValues()
    }
    
    if( localStorage.getItem('dataValues') ) {
        store.commit('setAuthenticateTrue')
    }
}

router.beforeEach((to, from, next) => {
    
    VerifyToken()
    
    if( to.name != 'login' && 
        to.name != 'register' && 
        !store.getters.getIsAuthenticated ){
            next({ name: 'login' })
    }
    else if( to.name == 'login' && store.getters.getIsAuthenticated ){
        next({name: 'home'})
    }
    else if( to.name == 'register' && store.getters.getIsAuthenticated ){
        next({name: 'home'})
    }
    else{
        next()
    }
})

export default router