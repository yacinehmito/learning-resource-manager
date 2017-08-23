<template>
    <div class="signup">
        {{ err }}
        <div class="login-wrapper columns">
    
            <section class="hero">
    
                <div class="hero-body">
                    <div class="container">
    
                        <div class="login-form">
                            <p class="control has-icon has-icon-right">
                                <input class="input email-input" v-model="email" type="email" placeholder="your email">
                                <span class="icon user">
                                    <i class="fa fa-user"></i>
                                </span>
                            </p>
                            <br>
    
                            <p class="control has-icon has-icon-right">
                                <input class="input email-input" v-model="username" type="text" placeholder="choose a username">
                                <span class="icon user">
                                    <i class="fa fa-user"></i>
                                </span>
                            </p>
                            <br>
    
                            <p class="control has-icon has-icon-right">
                                <input class="input password-input" v-model="password" type="password" placeholder="choose a password">
                                <span class="icon user">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </p>
                            <br>
                            <p class="control login">
                                <button class="button is-success is-outlined is-large" @click="signup">Signup</button>
                            </p>
    
                        </div>
    
                    </div>
                </div>
            </section>
    
        </div>
    </div>
</template>

<script>
import api from "@/api";
export default {
    name: 'signup',
    data() {
        return {
            username: null,
            password: null,
            email: null,
            err: null,
            msg: null
        }
    },
    methods: {
        signup() {
            api.auth.signup
                ({
                    username: this.username, password: this.password, email: this.email
                })
                .then(msg => {
                    api.auth.login({ username: this.username, password: this.password }, this)
                        .then(this.$router.push("/"))
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

