<template>
  <div id="app">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <nav class="navbar">
      <a @click="$router.push('/')" class="navbar-item" id="logo-container">
        <img src="./assets/logo.png" alt="Logo" id="logo" width="30" height="35">
      </a>

      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown" v-bind:class="{ 'is-active': navbarActive}">
            <a class="navbar-link" @click="toggleNavbar">
              Subject
            </a>

            <div class="navbar-dropdown">
              <div @click="falsifyNavbar">
                <router-link :to="{ name: 'Feed', params: { slug: subject }}" class="navbar-item" v-for="subject in subjects" :key="subject">
                  {{ subject }}
                </router-link>
              </div>

              <hr class=" navbar-divider ">
              <div class="navbar-item ">
                Version 1.0
              </div>
            </div>
          </div>

          <div class="navbar-item">
            <router-link :to="{name: 'Contribute'}">
              Contribute
            </router-link>
          </div>

        </div>

        <div class="navbar-end">
          <div class="navbar-item has-dropdown" v-bind:class="{ 'is-active': actionsActive}">
            <a class="navbar-link" @click="toggleActions">
              <span v-if="$root.user.token"> {{ $root.user.username }} </span>
              <span v-else> Account </span>
            </a>

            <div class="navbar-dropdown">

              <div @click="falsifyActions" v-if="!$root.user.token">
                <router-link :to="{ name: 'Login'}" class="navbar-item">
                  Login
                </router-link>
              </div>

              <div @click="falsifyActions" v-if="!$root.user.token">
                <router-link :to="{ name: 'Signup'}" class="navbar-item">
                  Signup
                </router-link>
              </div>

              <div @click="falsifyActions" v-if="$root.user.token">
                <router-link :to="{ name: 'Logout'}" class="navbar-item">
                  Logout
                </router-link>
              </div>

            </div>

          </div>
        </div>
      </div>

    </nav>

    <div class="actual-body " @click="falsifyNavbar">

      <section class="hero is-small is-info is-bold">
        <div class="hero-body has-text-centered">
          <div class="container ">
            <h1 class="title ">
              ReSourceFul
            </h1>

            <h2 class="subtitle ">
              A Friendly External-Resource Platform
            </h2>
          </div>
        </div>
      </section>

      <section class="section">
        <router-view></router-view>
      </section>

    </div>

    <footer class="footer ">
      <div class="container ">
        <div class="content has-text-centered is-small ">
          <p>
            <strong>Project</strong> by
            <p> Michael Lande Blau @Ironhack</p>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>




<script>
import api from "@/api";
import index from "@/router/index";
const dateFormat = require('dateformat');
const normalizeUrl = require('normalize-url');

export default {
  name: "app",
  data() {
    return {
      navbarActive: false,
      actionsActive: false,
      subjects: [],
      authorized: false
    };
  },
  methods: {
    toggleNavbar() {
      this.navbarActive = !this.navbarActive;
    },
    falsifyNavbar() {
      this.navbarActive = false;
    },
    toggleActions() {
      this.actionsActive = !this.actionsActive;
    },
    falsifyActions() {
      this.actionsActive = false;
    },
    getSubjects() {
      api.subjects.getAll().then(subjects => { this.subjects = subjects })
    },
    getCurrentUser() {
      const { id, username, token } = window.localStorage
      if (token != "null") {
        this.$root.user = { id, username, token };
        this.authorized = true;
        api.auth.loadUser(this);

      }
    },
  },

  created() {
    //window.document.title = "Resourceful, Complementary Learning"
    this.getSubjects();
    this.getCurrentUser();
  },
  computed: {
    prettySubjectList() {
      return this.subjects.map(subject =>
        subject.toUpperCase()
        //subject.charAt(0).toUpperCase() + subject.slice(1)
      )
    }
  },
  watch: {
    "$route"(to, from) {
      this.getCurrentUser();
    }
  }
};
</script>

<style>
@import "../node_modules/bulma/css/bulma.css";

#app {
  margin-top: 1em;
  margin-left: 1em;
  margin-right: 3em;
}

#logo-container {
  margin-left: 1em;
}

.footer {
  max-height: 5px;
}
</style>
