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
          <a class="navbar-item">
            HTML
          </a>
          <a class="navbar-item is-active">
            CSS
          </a>
          <a class="navbar-item">
            Vanilla JS
          </a>
          <a class="navbar-item">
            More nerdy stuff
          </a>
          <a class="navbar-item">
            Another
          </a>
          <a class="navbar-item">
            And another
          </a>
          <hr class="navbar-divider">
          <div class="navbar-item">
            Version 0.5.1
          </div>
        </div>
      </div>
    </nav>
  
    <div class="actual-body" @click="falisfyNavbar">
  
      <section class="hero is-danger">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              IronSomething
            </h1>
            <h2 class="subtitle">
              Where you go for that "Ah ha!" moment
            </h2>
          </div>
        </div>
      </section>
  
      <section class="section">
        <router-view></router-view>
      </section>
    </div>
  
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered  is-small">
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
export default {
  name: "app",
  data() {
    return {
      navbarActive: false,
      subjects: [1, 2, 3]
    };
  },
  methods: {
    toggleNavbar() {
      this.navbarActive = !this.navbarActive;
    },
    falisfyNavbar() {
      this.navbarActive = false;
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
