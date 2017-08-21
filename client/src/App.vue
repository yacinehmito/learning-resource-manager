<template>
  <div id="app">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <nav class="navbar">
      <a class="navbar-item" id="logo-container">
        <img src="./assets/logo-changed.png" alt="Logo" id="logo" width="30" height="28">
      </a>
  
      <div class="navbar-item has-dropdown" v-bind:class="{ 'is-active': navbarActive}">
        <a class="navbar-link" @click="toggleNavbar">
          Subject
        </a>
  
        <div class="navbar-dropdown">
          <div @click="falsifyNavbar">
            <router-link 
            :to="{ name: 'Feed', params: { slug: subject }}" 
            class="navbar-item" v-for="subject in subjects" 
            :key="subject">
              {{ subject.toUpperCase() }}
            </router-link>
          </div>
  
          <hr class=" navbar-divider ">
          <div class="navbar-item ">
            Version 0.5.1
          </div>
        </div>
      </div>
    </nav>
  
    <div class="actual-body " @click="falsifyNavbar ">
  
      <section class="hero is-danger ">
        <div class="hero-body ">
          <div class="container ">
            <h1 class="title ">
              IronSomething
            </h1>
            <h2 class="subtitle ">
              Where you go for that "Ah ha! " moment
            </h2>
          </div>
        </div>
      </section>
  
      <section class="section ">
        <router-view></router-view>
      </section>
    </div>
  
    <footer class="footer ">
      <div class="container ">
        <div class="content has-text-centered is-small ">
          <p>
            <strong>Project</strong> by
            <p> Michael Lande Blau </p>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>




<script>
import index from "@/router/index";
const dateFormat = require('dateformat');

export default {
  name: "app",
  data() {
    return {
      navbarActive: false,
      subjects: ["css", "html"],
    };
  },
  methods: {
    toggleNavbar() {
      this.navbarActive = !this.navbarActive;
    },
    falsifyNavbar() {
      this.navbarActive = false;
    }
  },
  computed: {
    prettySubjectList() {
      return this.subjects.map(subject =>
        subject.toUpperCase()
        //subject.charAt(0).toUpperCase() + subject.slice(1)
      )

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
