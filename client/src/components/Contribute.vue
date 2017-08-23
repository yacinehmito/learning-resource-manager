<template>
    <div class="login">
        {{ $root.user.token }} {{ $root.user.username }} {{ err }}
        <br> url: {{ url }}
        <br> description: {{ description }}
        <br> subject: {{ subject }}
        <br> headline: {{ headline }}
        <br> contributor: {{ contributor }}
        <div class="login-wrapper columns">
    
            <section class="hero">
    
                <div class="hero-body">
                    <div class="container">
    
                        <div class="login-form">
                            <p class="control has-icon has-icon-right">
                                <input class="input" type="text" v-model="url" placeholder="resource url here">
                                <span class="icon user">
                                    <i class="fa fa-crosshairs"></i>
                                </span>
                            </p>
                            <br>
                            <p class="control has-icon has-icon-right">
                                <input class="input" type="text" v-model="headline" placeholder="resource headline here">
                                <span class="icon user">
                                    <i class="fa fa-blind"></i>
                                </span>
                            </p>
                            <br>
                            <p class="control has-icon has-icon-right">
                                <input class="input" type="text" v-model="description" placeholder="one sentence description here">
                                <span class="icon user">
                                    <i class="fa fa-ellipsis-h"></i>
                                </span>
                            </p>
                            <br>
                            <p class="control has-icon has-icon-right">
                                <div class="select">
                                    <select v-model="subject">
                                        <option :key="subject" v-for="subject in subjects">
                                            {{ subject }}
                                        </option>
                                    </select>
                                </div>
                                <span class="icon user">
                                    <i class="fa fa-flag"></i>
                                </span>
                            </p>
                            <br>
                            <p class="control login">
                                <button class="button is-success is-outlined is-large" @click="contribute">Contribute!</button>
                            </p>
                            <br>
                            <div class="forgot-password">
                                <p>
                                    <a href="#"> Suggest New Subject</a>
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
import api from "@/api";
import external from "@/external-api";
const normalizeUrl = require('normalize-url');
export default {
    name: 'contribute',
    data() {
        return {
            url: null,
            subject: null,
            description: null,
            headline: null,
            contributor: null,
            subjects: [],
            item: null,
            err: null
        }
    },
    methods: {
        contribute() {
            api.items.postOne
                ({
                    url: normalizeUrl(this.url, { stripFragment: false }),
                    description: this.description,
                    subject: this.subject,
                    headline: this.headline,
                    contributor: this.contributor
                })
                .then(res => {
                    this.item = res;
                    this.$root.justContributed = true;
                    this.$root.welcome = false;
                    this.$router.push("/");


                })
                .catch(err => {
                    this.err = err
                })
        },
        getSubjects() {
            api.subjects.getAll().then(subjects => { this.subjects = subjects });
        },
        getContributor() {
            this.contributor = window.localStorage.id;
        },
        getHeadline() {
            external.getHeadline(url).then(res => { this.headline = res })
        }
    },
    created() {
        this.getSubjects();
        this.getContributor();

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

