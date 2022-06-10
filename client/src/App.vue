<template>
  <div>
    <v-app>
      <v-app-bar app color="primary" dark>
        <h1>SHORT URL</h1>
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

  data: () => ({
    //
  }),
};
</script>
