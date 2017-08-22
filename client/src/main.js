//@ts-check
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
// @ts-ignore
import App from "./App";
import router from "./router";

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
    }
  },
  methods: {
    logout() {}
  }
});
