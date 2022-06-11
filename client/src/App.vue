<template>
  <div>
    <v-app>
      <v-app-bar app color="primary" dark>
        <router-link to="/">
          <h1 class="white--text">SHORTO URL</h1></router-link
        >
        <v-spacer></v-spacer>
        <router-link
          v-if="currentRouteName === '/' && !$store.state.isLoggedIn"
          to="/login"
        >
          <v-btn color="white" class="primary--text"
            ><strong>Login</strong></v-btn
          >
        </router-link>
        <router-link
          v-if="$store.state.isLoggedIn && currentRouteName === '/'"
          to="/admin"
        >
          <v-btn color="white" class="primary--text"
            ><strong>Back to admin</strong>
          </v-btn>
        </router-link>

        <v-btn
          v-if="$store.state.isLoggedIn && currentRouteName === '/admin'"
          color="white"
          class="primary--text"
          @click="logout"
          ><strong>Logout</strong>
        </v-btn>
      </v-app-bar>
      <v-main>
        <router-view />
      </v-main>
      <v-footer color="primary lighten-1" padless>
        <v-col class="text-center white--text" cols="12">
          <strong>© 2022 Copyright</strong>
        </v-col>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    currentRouteName() {
      console.log("currentRouteName", this.$route.path === "/login");
      // console.log("currentRouteName", this.$router.currentRoute.path === "/");
      return this.$route.path;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("setLogout");
      this.$router.replace("/");
    },
  },
};
</script>
