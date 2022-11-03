import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import './style.css'


createApp(App)
.use(router)
.use(store)
.mount('#app')
