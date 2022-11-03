<template>
    <div class="wrapper">
        <div class="grid-template-login vh-100">
            <div class="img-iluistration d-flex align-items-center">
                <img :src="imagenIlustration" alt="">
            </div>
            <div class="p-4 mt-0 pt-0 d-flex form-login bg-light align-items-center">
                <form @submit.prevent="LogIn" class="p-2">

                    <img class="my-5 d-block m-auto" src="../assets/img/logo-chat-vue.png" alt="">

                    <h2 class="my-4">Sign in</h2>

                    <div class="form-group">
                        <input type="text" class="form-control form-control-lg"  placeholder="Email"
                            v-model.trim="email">
                    </div>
                    <div class="form-group mt-2">
                        <div class="d-flex align-items-center position-relative">
                            <input type="password"  ref="inputPassword"
                            class="form-control form-control-lg" placeholder="Password"
                            v-model.trim="password">
                            <span class="position-absolute bi bi-eye btn" style="right: 1em" @click="showPassword"></span>
                        </div>
                    </div>
                    <div class="form-group mt-3 px-3 d-flex justify-content-between">
                        <!-- <router-link to="/">Remember me</router-link> -->
                        <div class="d-flex align-items-center">
                            <input type="checkbox" id="remerber_me">
                            <label for="remerber_me" class="mx-2">Remember me</label>
                        </div>
                        <router-link to="/register">Forgot Password?</router-link>
                    </div>
                    <div class="form-group mt-3 pt-2">
                        <input :disabled="!disabledBtnSubmit" type="submit" value="Enter"
                            class="btn btn-lg btn-primary">
                    </div>
                    <div class="form-group mt-1 pt-2">
                        <router-link to="/register" class="border btn btn-lg text-center d-block">Create account</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import store from '../store'
import axios from 'axios'
import { useRouter } from 'vue-router'
import imagenIlustration from '../assets/img/work-chat-concept-illustration_114360-2592.png'

export default {
    name: 'Login',
    setup() {
        const email = ref('')
        const password = ref('')
        const showSpiner = ref(false)
        const disabledBtnSubmit = ref(false)
        const inputPassword = ref(null)

        const router = useRouter()

        watchEffect(() => {
            if (!/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email.value)) {
                disabledBtnSubmit.value = false
            }
            if (!/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(password.value)) {
                disabledBtnSubmit.value = false
            }
            if (password.value.length >= 5 && /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email.value)) {
                disabledBtnSubmit.value = true
            }
        })

        const showPassword = (event) => {
            let target = event.target
            if( inputPassword.value.type == 'password' ) {
                inputPassword.value.type = 'text'
                target.classList.remove('bi-eye')
                target.classList.add('bi-eye-slash')
            }else{
                target.classList.add('bi-eye')
                target.classList.remove('bi-eye-slash')
                inputPassword.value.type = 'password'
            }
        }

        const LogIn = () => {
            axios.post('/access/login', {email: email.value, password: password.value})
            .then((response) => {
                let data = response.data
                
                if(!data.active && data.status === 200){
                    alert('Cuenta Inactiva')
                }
                else if( data.status === 200 ){
                    localStorage.setItem('dataValues', JSON.stringify(data))
                    store.commit('setAuthenticateTrue')
                    router.push({name: 'home'})
                }else{
                    let error = data
                    alert(error.msg)
                }
            }).catch((err) => {
                console.log(err)
            })
        }

        return {
            email,
            password,
            inputPassword,
            showPassword,
            showSpiner,
            disabledBtnSubmit,
            imagenIlustration, LogIn
        }
    }
}
</script>

<style>
.grid-template-login {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
}

.img-iluistration img {
    max-width: 100%;
}

.form-login {
    background-color: #4a4be1;
}

@media (max-width: 650px) {
    .form-login {
        background-color: transparent !important;
    }

    .grid-template-login {
        height: auto !important;
    }
}
</style>