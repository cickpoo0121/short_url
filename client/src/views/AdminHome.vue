<template>
  <v-container>
    <h1 class="my-5">Admin</h1>
    <v-row class="d-flex justify-space-around">
      <v-col>
        <v-card shaped color="primary" dark class="pa-2">
          <v-card-title class="text-h5"><h3>All URL</h3> </v-card-title>
          <v-card-text>
            <h2>20 url in system</h2>
          </v-card-text>
          <!-- <v-card-actions>
          <v-btn text> Listen Now </v-btn>
        </v-card-actions> -->
        </v-card>
      </v-col>
      <v-col>
        <v-card shaped color="warning" dark class="pa-2">
          <v-card-title class="text-h5"><h3>TODAY URL</h3> </v-card-title>
          <v-card-text>
            <h2>20 url generated in today</h2>
          </v-card-text>
          <!-- <v-card-actions>
          <v-btn text> Listen Now </v-btn>
        </v-card-actions> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as shorturl from "@/utils/shortURL";

export default {
  data() {
    return {
      
    }
  },
  async mounted() {
    try {
      const res = await shorturl.history(sessionStorage.getItem("token"));
      console.log(res);
      if (!res.status && res.response.status === 403) {
        alert(res.response.data);
        this.$router.replace("/");
        sessionStorage.clear();
        console.log(res.response.status);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
