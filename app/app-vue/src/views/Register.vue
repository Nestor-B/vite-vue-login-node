<template>
    <div class="wrapper">
        <div class="grid-template-login vh-100">
            <div class="img-iluistration d-flex align-items-center">
                <img :src="imagenIlustration" alt="">
            </div>
            <div class="p-4 mt-0 pt-0 d-flex form-login bg-light align-items-center">
                <form @submit.prevent="SignIn" class="p-2">

                    <img class="my-5 d-block m-auto" src="../assets/img/logo-chat-vue.png" alt="">

                    <small v-if="warning" class="text-danger p-3 text-center d-block"> {{warning}} </small>

                    <h2 class="my-4">Sign up</h2>
                    
                    <div class="form-group ">
                        <input type="text" class="form-control form-control-lg"  placeholder="Nickname" v-model.trim="nickname">
                    </div>
                    <div class="form-group mt-2">
                        <input type="email" class="form-control form-control-lg" placeholder="Email" v-model.trim="email">
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
                            <input type="checkbox" id="terminos&condiciones">
                            <label for="terminos&condiciones" class="mx-2">
                                Acepto <router-link to="">Terminos y condiciones</router-link>
                            </label>
                        </div>
                        <span></span>
                    </div>
                    <div class="form-group mt-3 pt-2">
                        <input :disabled="!disabledBtnSubmit" type="submit" value="Create account" class="btn btn-lg btn-primary">
                    </div>
                    
                    <div class="form-group mt-1 pt-2">
                        <router-link to="/login" class="border btn btn-lg text-center d-block">Enter</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    // import Swal from 'sweetalert2'
    import { ref, watchEffect } from 'vue';
    import imagenIlustration from '../assets/img/work-chat-concept-illustration_114360-2592.png'

    export default {
        name: 'Register',
        setup(){
            const nickname = ref('')
            const email = ref('')
            const password = ref('')
            const warning = ref('')
            const showSpiner = ref(false)
            const disabledBtnSubmit = ref(false)
            const inputPassword = ref(null)

            watchEffect(() => {
                if( nickname.value.length > 0 && !/^[A-Za-z][A-Za-z0-9_]{5,12}$/.test(nickname.value) ){
                    disabledBtnSubmit.value = false
                    warning.value = 'Nickname invalido'
                }
                else if( email.value.length > 0 && !/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email.value) ){
                    disabledBtnSubmit.value = false
                    warning.value = 'Email invalido'
                }
                else if( password.value.length > 0 && password.value.length < 6 ){
                    disabledBtnSubmit.value = false
                    warning.value = 'Password invalido'
                }else{
                    warning.value = ''
                }

                if( password.value.length >= 5 && /^[A-Za-z][A-Za-z0-9_]{5,14}$/.test(nickname.value) && /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email.value) ){
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

            const SignIn = () => {
                alert()
            }

            return {
                nickname, 
                email,
                password, 
                inputPassword,
                showPassword,
                warning,
                showSpiner, 
                disabledBtnSubmit, 
                imagenIlustration,
                SignIn
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