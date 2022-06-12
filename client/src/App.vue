<template>
  <div>
    <v-app>
      <v-app-bar app color="primary" dark>
        <router-link to="/">
          <h1 class="white--text">SHORTO URL</h1></router-link
        >
        <v-spacer></v-spacer>
        <router-link
          v-if="currentRouteName === '/' && !isLoggedIn()"
          to="/login"
        >
          <v-btn color="white" class="primary--text"
            ><strong>Login</strong></v-btn
          >
        </router-link>
        <router-link
          v-if="isLoggedIn() && currentRouteName === '/'"
          to="/admin"
        >
          <v-btn color="white" class="primary--text"
            ><strong>Back to admin</strong>
          </v-btn>
        </router-link>

        <v-btn
          v-if="isLoggedIn() && currentRouteName === '/admin'"
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
      return this.$route.path;
    },
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.replace("/");
    },
    isLoggedIn() {
      return sessionStorage.getItem("isLoggedIn");
    },
  },
};
</script>
