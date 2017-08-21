<template>
    <div class="signup">
        <div class="login-wrapper columns">
    
            <section class="hero">
    
                <div class="hero-body">
                    <div class="container">
    
                        <div class="login-form">
                            <p class="control has-icon has-icon-right">
                                <input class="input email-input" type="text" placeholder="your email">
                                <span class="icon user">
                                    <i class="fa fa-user"></i>
                                </span>
                            </p>
                            <br>
    
                            <p class="control has-icon has-icon-right">
                                <input class="input email-input" type="text" placeholder="choose a username">
                                <span class="icon user">
                                    <i class="fa fa-user"></i>
                                </span>
                            </p>
                            <br>
    
                            <p class="control has-icon has-icon-right">
                                <input class="input password-input" type="password" placeholder="choose a password">
                                <span class="icon user">
                                    <i class="fa fa-lock"></i>
                                </span>
                            </p>
                            <br>
                            <p class="control login">
                                <button class="button is-success is-outlined is-large">Signup</button>
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
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

