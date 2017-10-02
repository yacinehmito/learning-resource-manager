<template>
    <div class="login">
        <div class="message-area" v-if="err">
            <div class="container">
                <article class="message is-primary">
                    <div class="message-body has-text-centered">
                        Wrong username or password. Try again

                    </div>
                </article>
            </div>
        </div>

        <div class="login-wrapper columns">

            <section class="hero">

                <div class="hero-body">
                    <div class="container">

                        <form @submit.prevent class="login-form">
                            <label class="control has-icon has-icon-right">
                                <input class="input email-input" type="text" v-model="username" name="username" placeholder="your username">
                                <span class="icon user">
                                    <i class="fa fa-user"></i>
                                </span>
                            </label>

                            <label class="control has-icon has-icon-right">
                                <input class="input password-input" type="password" v-model="password" name="password" placeholder="your password">
                                <span class="icon user">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </label>

                            <button class="control login button is-success is-outlined is-large" @click="login">Login</button>

                            <div class="forgot-password">
                                <p>
                                    <a href="#">Forgot password</a>
                                </p>
                            </div>

                        </form>

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
form label {
  display: block;
  margin-bottom: 1.2rem;
}

form input {
  display: block;
}
</style>

