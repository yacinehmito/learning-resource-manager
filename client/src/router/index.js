import Vue from "vue";
import Router from "vue-router";
import Feed from "@/components/Feed";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import Welcome from "@/components/Welcome";
import Contribute from "@/components/Contribute";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Default",
      redirect: "subjects/all"
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
    },
    {
      path: "/contribute",
      name: "Contribute",
      component: Contribute
    }
  ]
});
