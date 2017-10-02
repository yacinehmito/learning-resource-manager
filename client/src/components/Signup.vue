<template>
    <div class="signup">
        <div class="message-area" v-if="err">
            <div class="container">
                <article class="message is-primary">
                    <div class="message-body has-text-centered">
                        Error signing up. Try another username

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
                                <input class="input email-input" v-model="email" name="email" type="email" placeholder="your email">
                                <span class="icon user">
                                    <i class="fa fa-user"></i>
                                </span>
                            </label>

                            <label class="control has-icon has-icon-right">
                                <input class="input email-input" v-model="username" name="username" type="text" placeholder="choose a username">
                                <span class="icon user">
                                    <i class="fa fa-user"></i>
                                </span>
                            </label>

                            <label class="control has-icon has-icon-right">
                                <input class="input password-input" v-model="password" name="password" type="password" placeholder="choose a password">
                                <span class="icon user">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </label>

                            <button class="control login button is-success is-outlined is-large" @click="signup">Signup</button>

                        </form>

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
form label {
  display: block;
  margin-bottom: 1.2rem;
}
form input {
  display:block;
}
</style>

