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
      // console.log(store.state.token);
      // next((vm) => {
      //   console.log(vm);
      // });
      if (
        !sessionStorage.getItem("isLoggedIn") ||
        !sessionStorage.getItem("token")
      ) {
        // console.log(store.state);
        next("/");
      } else {
        next();
      }
      // console.log(to, from);
      // console.log(store.state);
      // reject the navigation
      // return false;
    },
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
