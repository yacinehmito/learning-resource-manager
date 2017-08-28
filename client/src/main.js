//@ts-check
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
// @ts-ignore
import App from "./App";
import router from "./router";
//dummy
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App },
  data: {
    user: {
      id: null,
      username: "",
      token: null
    },
    justContributed: false,
    welcome: true
  },
  methods: {
    logout() {
      window.localStorage.username = null;
      window.localStorage.id = null;
      window.localStorage.token = null;
      this.user = { id: null, username: "", token: null };
      this.$router.push({ name: "Login" });
    },
    redirect() {
      if (!this.user.token) {
        this.$router.push({ name: "Login" });
      }
    }
  }
});
