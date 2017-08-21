import Vue from "vue";
import Router from "vue-router";
import Feed from "@/components/Feed";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import Welcome from "@/components/Welcome";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: Welcome
    },

    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },

    {
      path: "/login",
      name: "Login",
      component: Login
    },

    {
      path: "/subjects/:slug",
      name: "Feed",
      component: Feed
    }
  ]
});
