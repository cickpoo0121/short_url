import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // token: "", isLoggedIn: false
  },
  mutations: {
    // SET_TOKEN(state, token) {
    //   state.token = token;
    //   if (token && state.token != null) {
    //     state.isLoggedIn = true;
    //     sessionStorage.setItem("token", token);
    //   } else {
    //     state.isLoggedIn = false;
    //   }
    // },
    // SET_LOGOUT(state) {
    //   state.token = "";
    //   state.isLoggedIn = false;
    //   sessionStorage.clear();
    // },
  },
  actions: {
    // setToken(state, token) {
    //   state.commit("SET_TOKEN", token);
    // },
    // setLogout(state) {
    //   state.commit("SET_LOGOUT");
    // },
  },
  modules: {},
});
