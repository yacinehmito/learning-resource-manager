<template>
    <div class="login">
        {{ err }} {{ $root.user }}
    
        <div class="login-wrapper columns">
    
            <section class="hero">
    
                <div class="hero-body">
                    <div class="container">
    
                        <div class="login-form">
                            <p class="control has-icon has-icon-right">
                                <input class="input email-input" type="text" v-model="username" placeholder="your username">
                                <span class="icon user">
                                    <i class="fa fa-user"></i>
                                </span>
                            </p>
                            <br>
                            <p class="control has-icon has-icon-right">
                                <input class="input password-input" type="password" v-model="password" placeholder="your password">
                                <span class="icon user">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </p>
                            <br>
                            <p class="control login">
                                <button class="button is-success is-outlined is-large" @click="login">Login</button>
                            </p>
    
                            <div class="forgot-password">
                                <p>
                                    <a href="#">Forgot password</a>
                                </p>
                            </div>
    
                        </div>
    
                    </div>
                </div>
            </section>
    
        </div>
    </div>
</template>

<script>
// dummy
import api from "@/api";
export default {
    name: 'login',
    data() {
        return {
            username: null,
            password: null,
            err: null
        }
    },
    methods: {
        login() {
            api.auth.login
                ({
                    username: this.username, password: this.password
                }, this)
                .then(res => {
                    this.err = null;
                    this.$root.welcome = true;
                    this.$router.push("/");
                })
                .catch(err => {
                    this.err = err;
                })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

