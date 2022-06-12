import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import axios from "axios";
import VueAxios from "vue-axios";
// import store from "../store/index";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin",
    name: "AdminHome",
    component: () => import("../views/AdminHome.vue"),
    beforeEnter: (to, from, next) => {
      // check before enter route
      if (
        !sessionStorage.getItem("isLoggedIn") ||
        !sessionStorage.getItem("token")
      ) {
        next("/");
      } else {
        next();
      }
    },
  },

  // handel 404 not found page
  { path: "*", component: () => import("../views/NotFound.vue") },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
